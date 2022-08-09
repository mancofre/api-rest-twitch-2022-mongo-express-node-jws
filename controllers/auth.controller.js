import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        
       let user = await User.findOne({email});
       if(user) throw {code: 11000};

        user = new User({email:email, password:password});
        await user.save();
        return res.status(201).json({ ok:'register ok'});

    } catch (error) {
        console.log(error)
        if(error.code === 11000){
            return res.status(400).json({error: 'Usuario ya existe..'});
        }
        return res.status(500).json({error: 'Error de servidor.'});
    }    
      
}

export const login = async (req, res) =>{    
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(!user) 
            return res.status(403).json({ error:'Usurio no existe.'});

        const respuestaPassword  = await user.comparePassword(password);
        if(!respuestaPassword)
            return res.status(403).json({ error:'contaseña incorrecta.'});

        // generamos el token con JWT
        var token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);
        res.json({ ok: 'login ok', token: token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error de servidor.'});
    }
    
}

