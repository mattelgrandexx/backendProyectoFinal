import { validationResult } from "express-validator";
import { Usuario } from "../models/usuario";


export const crearUsuario = async (req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
         return res.status(400).json({
            errors: errors.array()
          })
        }    

       const nuevoUsuario = new Usuario(req.body)
         await nuevoUsuario.save()

        res.status(201).json({
            message: "Usuario creado con exito."
        })

    } catch(e){
        console.log(e)
        res.status(404).json({
            message: "No pudimos crear el usuario.",
        })
    }
}

export const encontrarUsuario = async (req, res) => {
    try{
        let usuario = await Usuario.findOne({email: req.body.email, password: req.body.password})
        //creamos una validacion para ver si el email que ingresa ya existe, si no existe, devuelve null
        if(!usuario.email){
            return res.status(400).json({
                message: "Correo o contraseña incorrecta."
            })
        }
        if(!usuario.password){
            return res.status(400).json({
                message: "Correo o contraseña incorrecta."
            })
        }
        //Debemos generar el token del usuario
        
        //respondemos si existe
        res.status(200).json({
            message: "El usario esta registrado.",
            email : usuario.email,
            _id: usuario._id
        })

    } catch(e){
        res.status(400).json({
            message: "No pudimos encontrar a los usuarios."
        })
    }
}
