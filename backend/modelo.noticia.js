const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const esquemaNoticia = new Schema({
    titulo: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3
    },
    texto: {
        type: String,
        required: true,
    },
    imagem: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

const Noticia = mongoose.model('Noticia', esquemaNoticia);

module.exports = Noticia;