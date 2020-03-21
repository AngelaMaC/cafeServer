const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;