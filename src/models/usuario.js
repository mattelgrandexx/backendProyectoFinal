import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({

    nombreUsuario: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    }, 
    apellidoUsuario: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    }, 
    email: {
        type: String,
        required: true, 
        unique: [
            true,
            "El email debe ser unico, ya existe.",
          ],
    }, 
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 60
    },
    estado: {
        type: String,
        required: true,
        default: "no autenticado"
    },
    permiso: {
        type: String,
        required: true,
        default: "permitido"
    }
})

export const Usuario = mongoose.model("usuario", userSchema)
