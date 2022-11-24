const nodemailer = require("nodemailer");

const mail = {
    user: "nicoelias997@gmail.com",
    pass: "iwgwlktikcvxrcun"
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
            from: `Forgot password <${mail.user}>`, // sender address
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
            
            <p>Para confirmar tu cuenta, haz un click en el siguiente enlace</p>
            <a
            href="http://localhost:4000/apimenu/auth/perfilusuarios/confirm/${token}">
            Confirmar Email</a>
           </div>
        `
    }
    // <img src="https://trello.com/1/cards/636afa161043510112cf6151/attachments/636ef445cbe2c4032d6284cb/previews/636ef446cbe2c4032d6284d4/download/LENOLOGO2.png" alt="logo"
    //         className="ms-3" style={{heigth: 100}}></img>