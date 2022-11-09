import mongoose, {Schema} from "mongoose";

const menuSchema = new Schema = {
    nombreMenu: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 30
    }, 
    precioMenu: {
        type: Number, 
        required: true,
        min: 100, 
        max: 10000
    }, 
    descripcion: {
        type: String,
        required: true,
        unique: true,
        minLength: 20,
        maxLength: 1000
    },
    imagen: {
        type: String,
        required: true
    },
    pan:{
        type: String, 
        required: true
    }    
    // ,
    // categoria: {
    //     type: String,
    //     required: true
    // }
    //podriamos agregar categoria si vendemos postres o entrantes, veremos como vamos con el tiempo
}

export const Menu = mongoose.model("menu", menuSchema)


//   para el backend, manejando el administrador
//   {
//     nombreMenu: "Hamburguesa rustica",
//     precioMenu: 1400,
//     descripcion: "Hamburguesa 200gr de vacuno, con lechuga fresca y tomate de huerto, cebolla crispy. Con salsa especial de la casa. Acompañada de papas fritas o rusticas.",
//     imagen: "https://st2.depositphotos.com/1020618/8867/i/450/depositphotos_88671760-stock-photo-close-up-of-home-made.jpg",
//     pan: "brioche"
//   }

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
  