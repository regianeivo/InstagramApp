//importacao das dependencias que usaremos para configurar a aplicacao 
const express = require('express'); //express eh muito importante, vai ajudar a lidar com rotas, parametros e respostas 
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//divide o server tanto pra protocolo http como para websocket permitindo a comunicaco em tempo real
const server = require('http').Server(app); //protocolo http
const io = require('socket.io')(server); //protocolo web socket

//conexao com a database mongodb
mongoose.connect('mongodb+srv://semana:semana@cluster0-7wwfe.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

//middlewear
//passa a informacao pelo io em tempo real para todas as rotas
app.use((req, res, next)=> {
    req.io = io;

    next();
});

//cors que permite a todas as urls de servidores diferentes acessar a aplicacao 
//sem o cors o react nao consegue acessar o backend
app.use(cors()); 

//rota para acessar files estaticos das imagens que serao feitas upload
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//segundo arquivo separado de rotas para separar as rotas da aplicacao
app.use(require('./routes'));


Server.listen(3333);
