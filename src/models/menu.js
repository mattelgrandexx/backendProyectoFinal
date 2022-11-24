import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  nombreMenu: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 50,
  },
  precioMenu: {
    type: Number,
    required: true,
    min: 100,
    max: 10000,
  },
  descripcion: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 100,
  },
  imagen: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

export const Menu = mongoose.model("menu", menuSchema);
