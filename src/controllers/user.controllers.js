import { validationResult } from "express-validator";
import { Usuario } from "../models/usuario";
import bcrypt from 'bcryptjs';
import generarJWT from '../helpers/jwt';


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


        await nuevoUsuario.save()

        
        res.status(201).json({
            message: "Usuario creado con exito.",
            _id: nuevoUsuario._id,
            email: nuevoUsuario.email
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
      const { email, password } = req.body;
  
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
        _id: usuario._id,
        email: usuario.email,
        token
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "usuario o contraseña invalido",
      });
    }
  };