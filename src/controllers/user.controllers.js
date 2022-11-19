import { Usuario } from "../models/usuario";

export const encontrarUsuario = async (req, res) => {
    try{
        res("hola desde el get")
    } catch(e){
        res.status(400).json({
            message: "No pudimos encontrar a los usuarios."
        })
    }
}

export const crearUsuario = async (req,res) => {
    try{
        res("Desde el post")

    } catch(e){
        res.stauts(404).json({
            message: "No pudimos crear el usuario."
        })
    }
}

export default router;