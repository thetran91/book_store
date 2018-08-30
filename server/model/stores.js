const mongoose = require('mongoose');


const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim : true
    },
    phone: Number


});

const Stores = mongoose.model('Stores', storeSchema);

module.exports = {Stores}
