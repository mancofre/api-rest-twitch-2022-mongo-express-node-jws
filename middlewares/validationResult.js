import { validationResult } from 'express-validator';

export const resultadoValidacion = (req, res, next) => {
    var errores = validationResult(req);

    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    } 

    next();
}