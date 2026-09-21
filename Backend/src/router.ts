import { Router } from 'express';
import { body } from 'express-validator'
import { createAccount, getUser, login, updateProfile, uploadImage } from './handlers';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

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

router.get('/user', authenticate, getUser);
router.patch('/user',
  body('handle')
      .notEmpty()
      .withMessage("El handler no puede ir vacio"),
  body('description')
      .notEmpty()
    .withMessage("La descripcion no puede ir vacio"),
  authenticate, updateProfile)

router.post('/user/image', authenticate, uploadImage)

export default router;
