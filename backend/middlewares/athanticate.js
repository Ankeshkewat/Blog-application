const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs=require('fs');

const blacklist=fs.readFileSync('./blacklist.json','utf-8')

const authanticate = (req, res, next) => {
   const token = req.headers?.authorization?.split(' ')[1]||req.cookies?.token;
//   console.log(token)
   if (token) {
        if(blacklist.includes(token)){
        return res.status(401).send({'msg':"Login again"})
        }
      jwt.verify(token, process.env.secret, async function (err, decoded) {
         if (err) {
            console.log(err.message);
            res.status(401).send({ 'msg': 'Session expired' })
         }
         else if (decoded) {
            next()
         }
      })
   } else {
      res.status(401).send({ "msg": "Please login" })
   }
}

module.exports={authanticate}