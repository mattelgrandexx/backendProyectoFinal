const nodemailer = require("nodemailer");

const mail = {
    user: "lenotucumanarg@gmail.com",
    pass: "evagsutzxgcvrado"
}

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // tls: {
    //   rejectUnauthorized: false
    // },
    secure: true, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
  })

  transporter.verify().then(() => {
    console.log("Ready for send email")
  })

 export const enviarEmail = async (email, subject, html) => {
    try{
        await transporter.sendMail({
            from: `<${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            // text: "Hello world?", // plain text body
            html, // html body
          });     

    } catch(e){
        console.log(e)
    }
  }

   export const getTemplate = (nombreUsuario, token) => {
        return `
        <div>
            <h1>Hola ${nombreUsuario}, bienvenidos a Leno.</h1>
            <img src="https://i.postimg.cc/FFnKd1zQ/LENOLOGO3.png" alt="logo" heigth="400px" text-align="center" width="300px"></img>
            <p>Para confirmar tu cuenta, haz un click en el siguiente enlace</p>
            <a
            href="https://lenohamburguesas.netlify.app/confirmar/${token}"
            target="_blank">
            Confirmar Email</a>
           </div>
        `
    }

    export const getTemplateReset = (nombreUsuario, token) => {
      return `
      <div>
          <h1>Hola ${nombreUsuario}, bienvenidos a Leno.</h1>
          <img src="https://i.postimg.cc/FFnKd1zQ/LENOLOGO3.png" alt="logo" heigth="400px" text-align="center" width="300px"></img>
          <p>Para recuperar tu contraseña, haz un click en el siguiente enlace</p>
          <a
  href="https://lenohamburguesas.netlify.app/reset/${token}"
          target="_blank">
          Recuperar contraseña</a>
         </div>
      `
  }
    // href="http://localhost:3000/reset/${token}"

