const nodemailer = require('nodemailer');
const authenticator = require('authenticator');
const express = require('express');
require('dotenv').config()
const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
	try {
		const formattedKey = authenticator.generateKey();
		console.log(formattedKey)

		const formattedToken = authenticator.generateToken(formattedKey);
		console.log(formattedToken)

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.email,
				pass: process.env.password,
				clientId: '760013572935-kf6pgg2cl7gu7j2i5sr1a67fq3ihc5bd.apps.googleusercontent.com',
				clientSecret: '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',
				refreshToken: "1//04fCL-S-poCNeCgYIARAAGAQSNwF-L9IrlKnnOdiaJY1VQwjSd3n0bJW9_oROAIOEs9qbfjg8HHIA8kgl2E7Pz-ceF5xxfwSxrLs"
			}
		});

		const mailConfigurations = {
			from: 'ankeshkewat966@gmail.com',
			to: 'harnam01011983@gmail.com',
			subject: 'Sending Email using Node.js',
			text: `Ye raha apka opt ${formattedToken}`
		};

		transporter.sendMail(mailConfigurations, function (error, info) {
			if (error) {
				console.log(error)
			} else {
				console.log('Email Sent Successfully');
				res.send('Email Sent Successfully');

			}
			//console.log(info);
		})

	} catch (err) {
		console.log(err);
		res.send(err)
	}
})

app.get('/verify',async (req, res) => {
	try{
		
	}
	catch(err){
		console.log(err);
		res.send('err')
	}
})


app.listen(1200, ()=>{
	console.log('listening in 1200')
})