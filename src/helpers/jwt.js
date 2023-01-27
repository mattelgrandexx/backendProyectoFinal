import jwt from 'jsonwebtoken'

export const generarJWT = (_id, email)=>{
    return new Promise ((resolve, reject)=>{
        const payload = {_id, email};
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn:'1h'
        }, (err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}

export const obtenerToken = payload =>  {
    return jwt.sign({
        data : payload
    }, process.env.SECRET_JWT, {expiresIn: '1h'})
}

export const obtenerTokenData = token => {
    let data = null;
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if(err){
        } else {
            data = decoded
        }
    })
    return data
}
