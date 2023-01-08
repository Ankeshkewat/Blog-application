const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { BlogModel } = require('../models/blog.mode')
const { authanticate } = require('../middlewares/athanticate')
const { authorise } = require('../middlewares/authorize')
const BlogRouter = express.Router();

BlogRouter.post('/blog', authanticate, authorise(['Admin', 'Writer']), async (req, res) => {
  const token = req.headers?.['authorization']?.split(' ')[1];
  let decoded = jwt.verify(token, process.env.secret)
  console.log(decoded.id)
  try {
    let { title, content, } = req.body;
    let data = new BlogModel({ title, content, id: decoded.id });
    await data.save();
    res.send({ "msg": "Blog posted successfully" })
  }
  catch (err) {
    console.log(err);
    res.send({ "msg": "some error" })
  }
})
BlogRouter.get('/get', authanticate, authorise(['Admin', 'Writer']), async (req, res) => {
  try {

    const token = req.headers?.['authorization']?.split(' ')[1];
    jwt.verify(token, process.env.secret, async function (err, decoded) {
      if (err) {
        console.log(err)
        res.end(' ')
      }
      else {
        let { id } = decoded;
        let blogs = await BlogModel.find({ id: id })
        console.log(id)
        res.status(201).send({ 'msg': "All your post is here", blog: blogs })

      }
    })

  }
  catch (err) {
    console.log(err);
    res.send({ "msg": "some error" })
  }
})

BlogRouter.get('/get/all', authanticate, authorise(['Admin', 'Writer', 'User']), async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.status(201).send(data)

  } catch (eerr) {
    console.log(eerr);
    res.status(500).send({ "msg": "Some error ocur" })
  }
})

module.exports = { BlogRouter }