const mongoose = require('mongoose')
const Contact = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
    },
    telefone: {
        type: String,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Contact', Contact)