import { Router } from 'express';
import { body } from 'express-validator'
import { createAccount, login } from './handlers';
import { handleInputErrors } from './middleware/validation';

const router = Router();
/**Auteticacion y registro*/
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage("El handler no puede ir vacio"),
    body('name')
        .notEmpty()
        .withMessage("El nombre no puede ir vacio"),
    body('email')
        .isEmail()
        .withMessage("E-mail no valido"),
    body('password')
        .isLength({ min: 8 })
        .withMessage("Contraseña muy corta "),
    handleInputErrors,
    createAccount)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage("E-mail no valido"),
    body('password')
        .notEmpty()
        .withMessage("El password es obligatorio"),
    handleInputErrors,
    login)
export default router;
