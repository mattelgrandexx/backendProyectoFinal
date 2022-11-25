import { validationResult } from "express-validator";
import { Usuario } from "../models/usuario";
import bcrypt from 'bcryptjs';
import {generarJWT, obtenerToken, obtenerTokenData } from '../helpers/jwt';
import { enviarEmail, getTemplate } from "../helpers/mail";

export const consultarUsuarios = async (req, res) => {
  try{
    const listaUsuarios = await Usuario.find
      ({},{"password":0});
    res.status(200).json(listaUsuarios)
  } catch(e){
    res.status(400).json({
      message: "No pudimos obtener la lista de usuarios, intentelo nuevamente."
    })
  }
}


export const crearUsuario = async (req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
         return res.status(400).json({
            errors: errors.array()
          })
          
        }
        const { email, password } = req.body;

        let nuevoUsuario = await Usuario.findOne({ email }); //devulve un null

        if (nuevoUsuario) {
          //si el usuario existe
          return res.status(400).json({
            mensaje: "ya existe un usuario con el correo enviado",
          });
        }
    
        nuevoUsuario = new Usuario(req.body)

        const salt = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync(password, salt)

         const token = await obtenerToken(nuevoUsuario._id, nuevoUsuario.email)

         const template = getTemplate(nuevoUsuario.nombreUsuario, token)

         await enviarEmail(nuevoUsuario.email, "Autenticacion de email", template)

        await nuevoUsuario.save()

        
        res.status(201).json({
            message: "Usuario creado con exito.",
            _id: nuevoUsuario._id,
            email: nuevoUsuario.email,
            token
        })

    } catch(e){
        console.log(e)
        res.status(404).json({
            message: "No pudimos crear el usuario.",
        })
    }
}

export const encontrarUsuario = async (req, res) => {
    try {
      // manejar los errores de la validacion
      const errors = validationResult(req);
      // errors.isEmpty() devuelve false si hay errores
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
  
      //verificar si existe un mail como el recibido
      const { email, password} = req.body;
  
      //verificar si el email ya existe
      let usuario = await Usuario.findOne({ email }); //devulve un null
      if (!usuario) {
        //si el usuario existe
        return res.status(400).json({
          mensaje: "Correo o password invalido - correo",
        });
      }
     
      // desencriptar el password
      const passwordValido = bcrypt.compareSync(password, usuario.password)
  // si no es valido el password
      if (!passwordValido) {
        return res.status(400).json({
          mensaje: "Correo o password invalido - password",
        });
      }
      //generar el token
      const token = await generarJWT(usuario._id, usuario.email)
  
      //responder que el usuario es correcto
      res.status(200).json({
        mensaje: "El usuario existe",
        nombreUsuario: usuario.nombreUsuario,
        _id: usuario._id,
        email: usuario.email,
        estado: usuario.estado,
        token
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "usuario o contraseña invalido",
      });
    }
  };

  export const confirmEmail = async (req, res) => {
    try{
        //obtener el token
      const {token} = req.params;
        //verificamos la data
      const data = await obtenerTokenData(token)

      if(!data){
        return res.json({
          message: "Error al obtener data."
        })
      }
      // const {_id} = data.data
        //buscar si existe el usuario
        const usuario = await Usuario.findOne({_id: data.data} || null)

        if(usuario === null){
          return res.json({
            message: "Usuario no encontrado."
          })
        }
      
        //actualizar usuario
        usuario.estado = "Autenticado"
        //redireccionar a la confirmacion
        await usuario.save()

        return res.status(200).json({
            nombreUsuario: usuario.nombreUsuario,
            estado: usuario.estado,
            email: usuario.email,
            _id: usuario._id
        })

    }
    catch(e){
      console.log(e)
      res.status(404).json({
          message: "No pudimos confirmar el usuario.",
      })
  }
  }
  export const obtenerUsuario = async (req, res) => {
    try{
      const id = req.params._id
        const usuarioBuscado = await Producto.findById(id)
        res.status(200).json(usuarioBuscado)
    } catch(e){
      console.log(e)
      res.status(404).json({
        message: "Error al encontra el usuario."
      })
    }
    };

  export const eliminarUsuario = async (req, res) => {
    try{
       const id = req.params._id
      
        await Producto.findByIdAndDelete(id)
        res.status(200).json({
          message: "El usario fue eliminado correctamente."
        })
    } catch(e){
      console.log(e)
      res.status(404).json({
        message: "Error al intentar eliminar un usario."
      })
    }
    };


  export const resetPassword = async (req, res) => {
    try{
      const errors = validationResult(req);
      // errors.isEmpty() devuelve false si hay errores
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const {email} = req.body

      let usuario = await Usuario.findOne({email : email }); //devulve un null
      if (!usuario) {
        //si el usuario existe
        return res.status(400).json({
          mensaje: "No pudimos enviar un correo a esa direccion",
        });
      }      
      res.status(200).json({
        mensaje: "Email de recuperacion de contraseña enviado.",
        email: usuario.email
      })


    } catch(e){
      console.log(e)
    }
  }