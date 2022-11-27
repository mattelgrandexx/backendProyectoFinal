import mongoose, { Schema } from "mongoose";

const pedidosSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
  },

  pedido: [{
    nombreMenu: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    precioMenu: {
      type: Number,
      required: true,
      min: 100,
      max: 10000,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
]}
);

export const Pedidos = mongoose.model("pedidos", pedidosSchema);


