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
        const nuevoUSuario = new Usuario(req.body)
        await nuevoUSuario.save()
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
        res.send("hola desde el get")
    } catch(e){
        res.status(400).json({
            message: "No pudimos encontrar a los usuarios."
        })
    }
}
