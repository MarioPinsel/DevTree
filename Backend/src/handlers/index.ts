import type { Request, Response } from "express"
import { check, validationResult } from 'express-validator'
import slug from "slug"
import User from "../models/Users"
import { checkPassword, hashPassword } from "../utils/auth";
import { genareteJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const userExist = await User.findOne({ email })
    
    if (userExist) {
        const error = new Error("El Usuario con ese mail ya existe")
        return res.status(409).json({ error: error.message })
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })
    if (handleExist) {
        const error = new Error("Nombre de usuario no disponible")
        return res.status(409).json({ error: error.message })
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()

    res.status(201).send("Ha sido registrado correctamente")
}

export const login = async (req: Request, res: Response) => {

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    //Revisar si el usuario ya esta registrado
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("El Usuario no existe")
        return res.status(404).json({ error: error.message })

    }

    //Comprobar Password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error("Password incorrecto")
        return res.status(401).json({ error: error.message })
    }

    const token = genareteJWT({ id: user._id })

    res.send(token)

}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
}
