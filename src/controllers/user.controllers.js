import { validationResult } from "express-validator";
import { Usuario } from "../models/usuario";
import bcrypt from "bcryptjs";
import { generarJWT, obtenerToken, obtenerTokenData } from "../helpers/jwt";
import { enviarEmail, getTemplate, getTemplateReset } from "../helpers/mail";

export const consultarUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await Usuario.find({}, { password: 0 });
    res.status(200).json(listaUsuarios);
  } catch (e) {
    res.status(400).json({
      message: "No pudimos obtener la lista de usuarios, intentelo nuevamente.",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    let nuevoUsuario = await Usuario.findOne({ email }); //devulve un null

    if (nuevoUsuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    nuevoUsuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    nuevoUsuario.password = bcrypt.hashSync(password, salt);

    const token = await obtenerToken(nuevoUsuario._id, nuevoUsuario.email);

    const template = getTemplate(nuevoUsuario.nombreUsuario, token);

    await enviarEmail(nuevoUsuario.email, "Autenticacion de email", template);

    await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario creado con exito.",
      _id: nuevoUsuario._id,
      email: nuevoUsuario.email,
      token,
    });
  } catch (e) {
    res.status(404).json({
      message: "No pudimos crear el usuario.",
    });
  }
};

export const encontrarUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email }); 
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }

    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Correo o password invalido - password",
      });
    }
    const token = await generarJWT(usuario._id, usuario.email);
     res.status(200).json({
      mensaje: "El usuario existe",
      nombreUsuario: usuario.nombreUsuario,
      _id: usuario._id,
      email: usuario.email,
      estado: usuario.estado,
      permiso: usuario.permiso,
      admin: usuario.admin,
      token,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const data = await obtenerTokenData(token);

    if (!data) {
      return res.json({
        message: "Error al obtener data.",
      });
    }
    const usuario = await Usuario.findOne({ _id: data.data } || null);

    if (usuario === null) {
      return res.json({
        message: "Usuario no encontrado.",
      });
    }
    usuario.estado = "Autenticado";
    await usuario.save();

     res.status(200).json({
      nombreUsuario: usuario.nombreUsuario,
      estado: usuario.estado,
      email: usuario.email,
      _id: usuario._id,
    });
  } catch (e) {
    res.status(404).json({
      message: "No pudimos confirmar el usuario.",
    });
  }
};


export const eliminarUsuario = async (req, res) => {
  try {
    const id = req.params._id;
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({
      message: "El usario fue eliminado correctamente.",
    });
  } catch (e) {
    res.status(404).json({
      message: "Error al intentar eliminar un usario.",
    });
  }
};
export const suspenderUsuario = async (req, res) => {
  try {
    const id = req.params._id;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }
    usuario.permiso = "Suspendido";

    usuario.save();

     res.status(200).json({
      status: 200,
      permiso: usuario.permiso,
      message: "Usuario suspendido",
    });
  } catch (e) {
    res.status(404).json({
      message: "Error al intentar suspender un usario.",
    });
  }
};
export const permisoUsuarios = async (req, res) => {
  try {
    const id = req.params._id;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(400).json({
        message: "Usuario no encontrado.",
      });
    }
    usuario.permiso = "permitido";

    usuario.save();

     res.status(200).json({
      status: 200,
      permiso: usuario.permiso,
      message: "Usuario con permisos nuevamente.",
    });
  } catch (e) {
    res.status(404).json({
      message: "Error al intentar darle permisos al usuario.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email } = req.body;

    let usuario = await Usuario.findOne({ email: email }); //devulve un null
    if (!usuario) {
      return res.status(400).json({
        mensaje: "No pudimos enviar un correo a esa direccion",
      });
    }

    const token = await obtenerToken(usuario._id, usuario.email);

    const template = getTemplateReset(usuario.nombreUsuario, token);

    await enviarEmail(usuario.email, "Recuperar contraseña", template);

    res.status(200).json({
      mensaje: "Email de recuperacion de contraseña enviado.",
      email: usuario.email,

    });
  } catch (e) {
  }
};

export const actualizarPass = async (req, res) => {
  try{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { token } = req.params;
    const data = await obtenerTokenData(token);

    if (!data) {
      return res.json({
        message: "Error al obtener data.",
      });
    }
    const usuarioBuscado = await Usuario.findOne({ _id: data.data } || null);

    if (usuarioBuscado === null) {
      return res.json({
        message: "Usuario no encontrado.",
      });
    }
    const {password} = req.body

    usuarioBuscado.password = password

    const salt = bcrypt.genSaltSync();
    usuarioBuscado.password = bcrypt.hashSync(password, salt);

    await usuarioBuscado.save();

      res.status(200).json({
        message: "Contraseña modificada correctamente.",
        email: usuarioBuscado.email,
        _id: usuarioBuscado._id,
      })
  } catch(e){
    res.status(404).json({
      message: "Error al encontra el usuario."
    })
  }
  };

  export const obtenerEmail = async (req, res) => {
    try{

      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    
    const { token } = req.params;
    const data = await obtenerTokenData(token);
    if (!data) {
      return res.json({
        message: "Error al obtener data.",
      });
    }
    const usuarioBuscado = await Usuario.findOne({ _id: data.data },({}, { password: 0 }) || null);
    if (usuarioBuscado === null) {
      return res.json({
        message: "Usuario no encontrado.",
      });
    }
    res.status(200).json(usuarioBuscado)
    } catch(e){
      res.status(404).json({
        message: "Error al encontra el usuario."
      })
    }
    };
