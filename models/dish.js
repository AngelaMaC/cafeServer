const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },    
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: false
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    menu_id: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Promotion;