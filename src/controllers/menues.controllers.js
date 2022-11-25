import { validationResult } from "express-validator";
import { Menu } from "../models/menu";

export const listarMenus = async (req, res) => {
  try {
    const menues = await Menu.find();
    res.status(200).json(menues);
  } catch (error) {
    console.log(error);
    res.staus(400).json({
      message: "No pudimos encontrar los menus.",
    });
  }
};

export const crearMenu = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const nuevoMenu = new Menu(req.body);
    await nuevoMenu.save();
    res.status(201).json({
      message: "El menu se creo con exito.",
    });
  } catch (error) {
    res.status(404).json({
      message: "No se pudo crear el menu, intentenlo mas tarde.",
    });
  }
};

export const obtenerMenu = async (req, res) => {
  try {
    const id = req.params._id

    const menuBuscado = await Menu.findById(id);

    res.status(200).json(menuBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar el menu especificado",
    });
  }
};

export const editarMenu = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    await Menu.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).json({
      mensaje: "El menu se actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al editar el menu especificado",
    });
  }
};

export const borrarMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params._id);
    res.status(200).json({
      mensaje: "El menu se borro correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al borrar el menu especificado",
    });
  }
};
