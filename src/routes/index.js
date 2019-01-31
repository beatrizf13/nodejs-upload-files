require('dotenv').config();

const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const Post = require('../models/Post');

routes.get('/', (req, res) => res.json({
  name: 'nodejs-upload-files',
  version: '1.0.0',
}));

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const {
    originalname: name, size, key, location: url = '',
  } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url,
  });

  return res.send(post);
});

module.exports = routes;
