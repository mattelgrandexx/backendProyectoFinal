import { Hamburguesa } from "../models/menu"


export const listarMenues = async (req, res) => {
    try{
       const menues =  await Hamburguesa.find()
        res.status(200).json(menues)

    } catch(e){
        res.staus(400).json({
            message: "No pudimos encontrar los menues."
        })
    } 
}

export const crearMenues = async (req, res) => {
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
         return res.status(400).json({
            errors: errors.array()
          })
        }

        const nuevoMenu = new Menu(req.body)
        await nuevoMenu.save()
        res.status(201).json({
            message: "Creamos el menu con exito."
        })
    } catch(e){
        res.status(404).json({
            message: "No pudimos crear el menu, intentenlo mas tarde."
        })
    }
}