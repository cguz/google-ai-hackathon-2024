var nodemailer = require('nodemailer');

const sendEmail = async (toBcc, messageType) => { 
    try {
        //creamos el transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: { ciphers: 'SSLv3' },
        });
        //message
        const message = {
            from: process.env.EMAIL,
            to: toBcc,
            //bcc: toBcc,
            subject: checkTitle(messageType),
            html: checkBody(messageType),
        };
        //enviar el message
        const info = await transporter.sendMail(message);
        return info;
    } catch (error) {
        throw new Error("Email could not be sent");
    }
}

function checkTitle(messageType) {
    if (messageType === "msA"){
        return "Nuevo profesor registrado en TeacherApp"
    } 
    if (messageType === "msB"){
        return "Nueva asignatura pendiente de validar"
    }
}

function checkBody(messageType, url) {
    if(messageType === "msA"){
        return `\n\n<p>Un nuevo profesor se ha registrado en TeacherApp, pulse en este <a target="_blank" href="${url}">link</a> para ir al perfil del profesor y validarlo.</p>`;
    }
    if(messageType === "msB"){
        return `\n\n<p>Un profesor quiere añadir una nueva asignatura en TeacherApp, pulse en este <a target="_blank" href="${url}">link</a> para comprobar que no esté ya en la base de datos y validarla.</p>`;
    }
}

module.exports = { sendEmail }