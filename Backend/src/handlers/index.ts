import type { Request, Response } from "express"
import { validationResult } from 'express-validator'
import slug from "slug"
import formidable from 'formidable'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth";
import { genareteJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary"

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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })
    if (handleExist && handleExist.email !== req.user.email) {
        const error = new Error("Nombre de usuario no disponible")
        return res.status(409).json({ error: error.message })
    }

    req.user.description = description
    req.user.handle = handle
    await req.user.save()
    res.send("Usuario actualizado correctamente")


  } catch (e) {
    const error = new Error("Hubo un error")
    return res.status(500).json({ error: error.message })
  }

}

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const form = formidable({ multiples: false })
    form.parse(req, (error, fields, files) => {
      console.log(files.image[0])

    })

  } catch (e) {
    const error = new Error("Hubo un error")
    return res.status(500).json({ error: error.message })
  }

}
