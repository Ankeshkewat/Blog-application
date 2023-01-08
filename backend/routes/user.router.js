const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const fs = require('fs');

const blacklist = fs.readFileSync('./blacklist.json', 'utf-8')

const UserRouter = express.Router()
const { authanticate } = require('../middlewares/athanticate')
const { UserModel } = require('../models/user.model')
const { OtpModel } = require('../models/otp.model')

UserRouter.use(cookieParser())

UserRouter.get('/', (req, res) => {
    res.cookie('nxm201', 'Firstcookie')
    res.status(201).send({ "msg": "Hello from router" })
})

//signup
UserRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    bcrypt.hash(password, 6, async function (err, hash) {
        if (err) {
            res.status(500).send({ 'msg': "Something went wrong" })
        }
        else {
            try {
                let user = new UserModel({ email, password: hash });
                await user.save();
                let otp = Math.floor(Math.random()*10000);
                console.log(otp)
                let new_otp =  new OtpModel({otp})
                await new_otp.save()
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: process.env.email,
                        pass: process.env.password,
                        clientId: process.env.clientId,
                        clientSecret: process.env.clientSecret,
                        refreshToken: process.env.refreshToken
                    }
                });

                const mailConfigurations = {
                    from: 'ankeshkewat966@gmail.com',
                    to:email,
                    subject: `Your verification code is ${otp}`,
                    text: 'Sending Email For verification'
                };

                transporter.sendMail(mailConfigurations, async function (error, info) {
                    if (error) {
                        console.log(error)
                        res.status(500).send({"msg":"Something went wrong"})
                    } else {
                       
                        console.log('Email Sent Successfully');
                        res.status(201).send({ "msg": "Otp Sent Successfully","email":email})
                    
                    }
                    //console.log(info);
                })
            }
            catch (err) {
                console.log(err);
                res.status(401).send({ "msg": "Something went wrong" })
            }
        }
    })
})

UserRouter.post('/verify',async (req,res)=>{
    let {otp}=req.body;
    console.log(otp)
    try{
         if(!otp){
            return res.status(401).send({"msg":"Please enter otp"})
         }
         let data=await OtpModel.find({otp});
         if(data.length>0){
           try{
            const {email}=req.body;
            let data= await UserModel.find({email});
            const token = jwt.sign({ id: data._id }, process.env.secret, { expiresIn: '4 days' })
            const refreshtoken = jwt.sign({ id: data._id }, process.env.refresh, { expiresIn: '7 days' })
            res.status(201).send({"msg":"Account Created Successfully","token":token,'refreshtoken':refreshtoken})
           }catch(er){
            console.log(er);
            res.status(500).send({"msg":"Something went wrong"})
           }
         }else{
            res.status(401).send({"msg":"Wrong OTP"})
         }

    }
    catch(err){
        console.log(err);
        res.status(401).send({"msg":"Some error"})
    }
})

//login
UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && user.email) {
        try {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ 'msg': "Something went wrong" })
                }
                else if (result) {
                    let token = jwt.sign({ id: user._id }, process.env.secret, { expiresIn: '4 days' })
                    let refreshtoken = jwt.sign({ id: user._id }, process.env.refresh, { expiresIn: '7 days' })
                    res.cookie('token', token, { httpOnly: true })
                    res.status(200).send({ "msg": "login successfull", token, refreshtoken })
                }
                else {
                    res.send({ 'msg': "incorrect password" })
                }
            })
        }
        catch (err) {
            // internal failure
            console.log(err)
            res.status(500).send({ "msg": "Somethng went wrong" })
        }
    }
    else {
        res.status(401).send({ "msg": "Invailid credentials" })
    }
})

//getnewtoken
UserRouter.get('/getnewtoken', (req, res) => {
    const refreshtoken = req.headers?.authorization?.split(' ')[1] || req.cookies.token
    if (!refreshtoken) {
        return res.send({ "msg": "Please Login" })
    }
    jwt.verify(refreshtoken, process.env.refresh, function (err, decoded) {
        if (err) {
            return res.send({ "msg": "Pleae Login" })
        }
        else {
            const { id } = decoded;
            const newnormaltoken = jwt.sign({ id }, process.env.secret, { expiresIn: '1h' });
            return res.status(201).send({ "token": newnormaltoken })
        }
    })

})
//logout
UserRouter.get('/logout', async (req, res) => {
    const token = req.headers?.authorization?.split(' ')[1] || req.cookies.token
    const blacklistData = JSON.parse(blacklist)
    blacklistData.push(token);
    fs.writeFileSync('./blacklist.json', JSON.stringify(blacklistData))
    res.send({ "msg": "User logout succesfully" })
})
module.exports = { UserRouter }