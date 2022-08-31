// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// ************ Validations ************
const validateRegister = 
[
    check('fullname')
        .notEmpty().withMessage("Escribe tu nombre completo.").bail()
        .isLength({min: 2, max: 20}).withMessage("Debe incluir entre 2 y 20 caracteres."),

    check('username')
        .notEmpty().withMessage("Escribe tu nombre de usuario.").bail()
        .isLength({min: 3, max: 12}).withMessage("Debe incluir entre 2 y 12 caracteres."),

    check('password1')
        .notEmpty().withMessage("Escribe tu contraseña.").bail()
        .isLength({min: 3, max: 16}).withMessage("Debe incluir entre 2 y 16 caracteres.").bail()
        .isStrongPassword({minLowercase: 1, minUppercase: 1, minNumbers: 1, returnScore: false}).withMessage("Tu contraseña debe incluir al menos una letra minúscula, una mayúscula y un número."),

    check('password2')
        .notEmpty().withMessage("Repite tu contraseña.").bail()
        .isLength({min: 3, max: 16}).withMessage("Debe incluir entre 2 y 16 caracteres.").bail()
        .custom((value, {req}) => 
        {
            if(value === req.body.password1) return true;
            else throw new Error('Las contraseñas no coinciden.');
        }),

    check('email')
        .notEmpty().withMessage("Escribe tu dirección de email.").bail()
        .isEmail().withMessage("Debes introducir una dirección de email valida").bail()
        .isLength({min: 3, max: 30}).withMessage("Debe incluir entre 3 y 30 caracteres."),

    check('birthday')
        .notEmpty().withMessage("Selecciona tu fecha de nacimiento."),

    check('address')
        .notEmpty().withMessage("Escribe tu dirección.").bail()
        .isLength({min: 3, max: 40}).withMessage("Debe incluir entre 3 y 40 caracteres."),

    check('profile')
        .notEmpty().withMessage("Debes seleccionar el perfil de tu cuenta")
];

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 
router.get('/register', mainController.register);
router.post('/register', validateRegister, mainController.processRegister);

module.exports = router;
