//importacao das dependencias
const express = require('express');
const multer = require('multer'); //multer ajuda a ver os dados no insominia
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

//rotas get and posts dentro do file postController
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

//rota que vai permitir ar likes dentro do file likeController
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;