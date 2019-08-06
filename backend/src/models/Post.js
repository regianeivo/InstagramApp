const mongoose = require('mongoose');

//representacao da tabela do banco de dados em foramto de js
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);