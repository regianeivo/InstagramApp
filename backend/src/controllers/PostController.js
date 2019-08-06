const Post = require('../models/Post');
const sharp = require('sharp'); // dependencia que manipula imagens
const path = require('path'); // dependencias do proprio node
const fs = require('fs'); // dependencias do proprio node

module.exports = {
    //rota index retorna todos os posts ordenados pelo campo createdAt,
    //de forma decrescente, por isso o - antes do field
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');
        
        //retorna em formato de json
        return res.json(posts);
    },

    //recebe os dados do arquivo (fields)
    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;
        
        const [name] = image.split('.');
        const fileName = `${name}.jpg`; 

        //redimensiona a imagem enviada
        await sharp(req.file.path) // caminho onde minha imagem foi salva
          .resize(500) // adequar o tamnho da foto para 500px
          .jpeg({ quality:70 }) // qualidade da foto em jpeg
          .toFile( // exportando para um novo arquivo dentro da pasta resized
                path.resolve(req.file.destination,'resized', fileName)
            )
        
        fs.unlinkSync(req.file.path); // vai deletar a imagem salva anteriormente 
                                        // e que estava fora da pasta resized

        // dados do post
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        //e transmite informacao em tempo real atraves do io
        req.io.emit('post', post);

        return res.json(post);

    }

};