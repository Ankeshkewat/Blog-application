const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs');

const blacklist = fs.readFileSync('./blacklist.json', 'utf-8')

const Redis = require('ioredis');
const { send } = require('process');
const redis = new Redis({
   port: 12565,
   host: 'redis-12565.c301.ap-south-1-1.ec2.cloud.redislabs.com',
   password: "rgE5ofgZDJnKcl81YQAxPrei0b8nphdQ",
})


// const authanticate = (req, res, next) => {
//    const token = req.headers?.authorization?.split(' ')[1]||req.cookies?.token;
// //   console.log(token)
//    if (token) {
//         if(blacklist.includes(token)){
//          console.log("Login again")
//         return res.status(401).send({'msg':"Login again"})
//         }
//       jwt.verify(token, process.env.secret, async function (err, decoded) {
//          if (err) {
//             console.log(err.message);
//             res.status(401).send({ 'msg': 'Session expired' })
//          }
//          else if (decoded) {
//             console.log(decoded)
//            const role=decoded?.role;
//            console.log(role)
//            req.body.userRole=role
//             next()
//          }
//       })
//    } else {
//       res.status(401).send({ "msg": "Please login" })
//    }
// }



// using redis now i am geting token
const authanticate = (req, res, next) => {
   redis.get('blacklist',(err,blacklist)=>{
      if(err){
         console.log(err);
         res.send({'msg':"Something went wrong"})
      }else{
         redis.get('token', (err, result) => {
            if (err) {
               console.log(err)
               res.status(401).send({ "msg": "You are not authorized" })
            } else {
               if(blacklist==result){
               return  res.status(401).send({"msg":"PLease login again"})
               }
               req.body.token=result
               jwt.verify(result, process.env.secret, async function (err, decoded) {
                  if (err) {
                     console.log(err.message);
                     res.status(401).send({ 'msg': 'Session expired' })
                  }
                  else if (decoded) {
                     // console.log(decoded)
                     const role = decoded?.role;
                     //   console.log(role)
                     req.body.userRole = role
                     next()
                  }
               })
            }
         })
      
      }
   })
  
}




module.exports = { authanticate }