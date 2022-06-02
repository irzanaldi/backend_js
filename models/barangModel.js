const mongoose = require('mongoose');

const barangModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
    default: 0,
  },
  qty:{
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('BarangModel', barangModel);