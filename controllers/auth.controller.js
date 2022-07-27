
export const register = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.json({ ok:'register ok'});
      
}

export const  login = (req, res) =>{
    res.json({ ok: 'login ok'})
}

