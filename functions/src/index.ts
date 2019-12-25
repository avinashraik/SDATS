import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';

admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'sdd.shared@gmail.com',
        pass: 'sdei#2002'
    }
});
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

let _cors = cors(corsOptions);
export const sendMail = functions.https.onRequest((req, res) => {
    _cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Your Account Name <sdd.shared@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'I\'M A PICKLE!!!', // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };

        // returning result
        transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                res.send(erro.toString());
            }
            res.send('Sended');
        });
    });
});
