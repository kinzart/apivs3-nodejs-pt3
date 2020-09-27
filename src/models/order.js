//const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  client: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  order: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('Order', schema);
