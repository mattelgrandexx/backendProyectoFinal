import jwt from 'jsonwebtoken'

// export const generarJWT = (_id, email)=>{
//     return new Promise ((resolve, reject)=>{
//         // los datos
//         const payload = {_id, email};
//         // firmar el token
//         jwt.sign(payload, process.env.SECRET_JWT, {
//             expiresIn:'1h'
//         }, (err, token)=>{
//             //si falla el generar el token
//             if(err){
//                 console.log(err);
//                 reject('No se pudo generar el token')
//             }
//             // si esta bien el token
//             resolve(token)
//         })
//     })
// }

export const obtenerToken = payload =>  {
    return jwt.sign({
        data : payload
    }, process.env.SECRET_JWT, {expiresIn: '1h'})
}

export const obtenerTokenData = token => {
    let data = null;
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if(err){
            console.log("Error al obtener data del token")
        } else {
            data = decoded
        }
    })
    return data
}
