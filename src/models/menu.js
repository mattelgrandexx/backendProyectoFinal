import mongoose, {Schema} from "mongoose";

const menuSchema = new Schema = {
    nombreMenu: "Hamburguesa rustica",
    precioMenu: 1400,
    descripcion: "Hamburguesa 200gr de vacuno, con lechuga fresca y tomate de huerto, cebolla crispy. Con salsa especial de la casa. Acompañada de papas fritas o rusticas.",
    imagen: "https://st2.depositphotos.com/1020618/8867/i/450/depositphotos_88671760-stock-photo-close-up-of-home-made.jpg",
    pan: "brioche"
  }

  const MENU = mongoose.model("menu", menuSchema)


// para el FRONT END, POR SI ALGUIEN PIDE
// {
//     "nombreMenu": "Hamburguesa rustica",
//     "precioMenu": 1400,
//     "descripcion": "Hamburguesa 200gr de vacuno, con lechuga fresca y tomate de huerto, cebolla crispy. Con salsa especial de la casa. Acompañada de papas fritas o rusticas.",
//     "imagen": "https://st2.depositphotos.com/1020618/8867/i/450/depositphotos_88671760-stock-photo-close-up-of-home-made.jpg",
//     "pan": "brioche",
//     "extras": ["cheddar", "bacon"],
//     "coccion": "A punto",
//     "detalle": "sin lechuga",
//     "precioTotal": 1650
//   }
  