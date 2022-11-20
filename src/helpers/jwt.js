import jwt from 'jsonwebtoken'

const generarJWT = (_id, email)=>{
    return new Promise ((resolve, reject)=>{
        // los datos
        const payload = {_id, email};
        // firmar el token
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn:'1h'
        }, (err, token)=>{
            //si falla el generar el token
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }
            // si esta bien el token
            resolve(token)
        })
    })
}

export default generarJWT
