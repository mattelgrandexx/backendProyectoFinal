import { Pedidos } from "../models/pedidos";
import { validationResult } from "express-validator";

export const listarPedidos = async (req, res) => {
    try {
    
        const pedidos = await Pedidos.find();
   
     res.status(200).json(pedidos);
    } catch (error) {
     res.status(404).json({
       mensaje: "error al buscar los pedidos"
     })
    }
};

export const obtenerPedidos =  async(req, res)=>{
    try {
       
       
        const id = req.params.id;
       
        const pedidos = await Pedidos.findById(id)
      
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(404).json({
            mensaje:'Error al buscar el pedido'
        })
    }
}

export const editarPedidos =  async(req, res)=>{
    try {

        await Pedidos.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            mensaje:'Pedido editado correctamente'
        })

    } catch (error) {
        res.status(400).json({
            mensaje:'Error al intentar editar un pedido'
        })
    }
}

export const borrarPedidos =  async(req, res)=>{
    try {

        await Pedidos.findByIdAndDelete(req.params.id, req.body);

        res.status(200).json({
            mensaje:'Pedido borrado correctamente'
        })

    } catch (error) {
        res.status(404).json({
            mensaje:'Error al intentar borrar el producto'
        })
    }
}

export const crearPedidos = async (req, res)=>{ 

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
            const pedidoNuevo = new Pedidos(req.body)
            await pedidoNuevo.save();

        res.status(201).json({
            mensaje: 'El pedido fue creado correctamente',
        })


    } catch (error) {
        res.status(404).json({
            mensaje: 'ERROR al intentar agregar un nuevo pedido',
        })
    }

  
}