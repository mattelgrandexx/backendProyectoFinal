import Pedido from "./models/pedido";
import mongoose, { Schema } from "mongoose";

const pedidosSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
    minLength: 2,
  },

  pedido: {
    nombreMenu: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
      minLength: 2,
    },
    precioMenu: {
      type: Number,
      required: true,
      min: 100,
      max: 10000,
    },
  },
});

const Pedidos = mongoose.model("pedidos", pedidosSchema);

export default Pedidos;
