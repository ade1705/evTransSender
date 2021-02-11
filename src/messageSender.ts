const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
	pool: true,
	streamTransport: true,
	newline: 'unix',
	host: process.env.SMTP_HOSTNAME,
	port: process.env.SMTP_PORT,
	secure: false, // use TLS
	auth: {
		user: process.env.SMTP_USERNAME,
		pass: process.env.SMTP_PASSWORD
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false
	}
});

export class MessageSender {
	send = async(evTransMessage: any = {}) => {
		console.log('sending');
		try {
			let info = await transporter.sendMail({
				from: `"${evTransMessage.from.name} 👻" <${evTransMessage.from.email}>`,
				to: `"${evTransMessage.to[1].email} 👻" <${evTransMessage.to[1].name}>`,
				subject: evTransMessage.subject, // Subject line
				text: "Hello world?", // plain text body
				html: "<b>Hello world?</b>", // html body
			});
			console.log(info);
		} catch (error) {
			console.log(error);
		}
	}
}
