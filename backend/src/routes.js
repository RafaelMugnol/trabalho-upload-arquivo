const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

const basicAuth = require('express-basic-auth')

routes.get('/', (req, res) => {
  return res.send('URL da API');
});
routes.get('/boxes/:id', basicAuth({
    users: { 'admin': 'senhasecreta' }
}), BoxController.show);

routes.post('/boxes', basicAuth({
    users: { 'admin': 'senhasecreta' }
}), BoxController.store);

routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
);

module.exports = routes;
