const Post = require('../models/Post');

module.exports = {

    async store(req, res){
        
        const post = await Post.findById(req.params.id);
        post.likes += 1; //adiciona +1 a cada like
        await post.save();

        // transmite a informacao like em tempo real
        req.io.emit('like', post);

        return res.json({post});

    }

};