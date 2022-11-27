import { Pedidos } from "../models/pedidos";
import { validationResult } from "express-validator";

export const listarPedidos = async (req, res) => {
    try {
     // buscar los productos
        const pedidos = await Pedidos.find();
     // responder al frontend con el arreglo de objetos
     res.status(200).json(pedidos);
    } catch (error) {
     console.log(error);
     // enviar una respuesta al frontend
     res.status(404).json({
       mensaje: "error al buscar los pedidos"
     })
    }
};

export const obtenerPedidos =  async(req, res)=>{
    try {
       
        //obtener el parametro
        const id = req.params.id;
        //buscar en la base de datos el producto que coincide con el parametro
        const pedidos = await Pedidos.findById(id)
        //responder el frontend
        res.status(200).json(pedidos)
    } catch (error) {
        console.log(error);
        //enviar una respuesta al frontend
        res.status(404).json({
            mensaje:'Error al buscar el pedido'
        })
    }
}

export const editarPedidos =  async(req, res)=>{
    try {
        
        //obtener el parametro
        //obtener los datos del body validados
        //actualizar el producto en la base de datos

        await Pedidos.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            mensaje:'Pedido editado correctamente'
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            mensaje:'Error al intentar editar un pedido'
        })
    }
}

export const borrarPedidos =  async(req, res)=>{
    try {
        
        //obtener el parametro
        //obtener los datos del body validados
        //actualizar el producto en la base de datos

        await Pedidos.findByIdAndDelete(req.params.id, req.body);

        res.status(200).json({
            mensaje:'Pedido borrado correctamente'
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            mensaje:'Error al intentar borrar el producto'
        })
    }
}

export const crearPedidos = async (req, res)=>{

    //manejar los errores de la validacion 

    
    try {
        const errors = validationResult(req)
        // console.log devuelve false si hay errores

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
    
        // validar datos de objeto
            const pedidoNuevo = new Pedidos(req.body)
        //guardar el objeto en base de datos
            await pedidoNuevo.save();

        res.status(201).json({
            mensaje: 'El pedido fue creado correctamente',
        })


    } catch (error) {
        console.log(error);

        res.status(404).json({
            mensaje: 'ERROR al intentar agregar un nuevo pedido',
        })
    }

  
}