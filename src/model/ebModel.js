const mongoose = require('mongoose');

const ebSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minglenght: 4,
        maxlenght: 30,
    },

    patent: {
        type: String,
        required: true,
        minglenght: 4,
        maxlenght: 30,
        default: 'recruta',
    },

    squad: {
        type: String,
        required: true,
        minglenght: 4,
        maxlenght: 30,
    },

    weapon: {
        type: String,
        required: true,
        minglenght: 4,
        maxlenght: 50,
    },

    status: {
        type: String,
        required: true,
        default: 'ativo'
    },

    steam: {
        type: String,
        minglenght: 4,
    }
}, {timestamps: true});

module.exports = mongoose.model('Eb', ebSchema);

