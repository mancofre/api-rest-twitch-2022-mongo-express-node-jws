import express from "express";
import { body } from 'express-validator';
import { login, register } from "../controllers/auth.controller.js";
import { resultadoValidacion } from '../middlewares/validationResult.js';

const router = express.Router();

router.get('/login',[
                body('email', 'Formato email incorrecto. 🤷‍♀️')
                    .trim()
                    .isEmail()
                    .normalizeEmail(),
                body('password', 'Formato de Password incorrecto. 🤷‍♂️')
                    .isLength({ min: 6})
                    .trim()
                    
            ],
            resultadoValidacion, 
        login);

router.post('/register',[
                    body('email', 'Formato email incorrecto. 🤷‍♀️')
                        .trim()
                        .isEmail()
                        .normalizeEmail(),
                    body('password', 'Minimo 6 caracteres. 🤷‍♂️')
                        .isLength({ min: 6})
                        .trim(),
                    body('password', 'Formato de Password incorrecto. 🤷‍♂️')
                        .custom((value, {req}) => {
                            if(value != req.body.repassword){
                                throw new Error('Contraseñas son distintas.')
                            }
                            return value;
                        })
                ],
                resultadoValidacion,
                register);

export default router;