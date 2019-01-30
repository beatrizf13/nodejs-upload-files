const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

routes.get('/', (req, res) => res.json({
  name: 'nodejs-upload-files',
  version: '1.0.0',
}));

routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file);
  return res.send(200);
});

module.exports = routes;
