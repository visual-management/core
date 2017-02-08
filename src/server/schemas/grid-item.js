const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const GridItem = new Schema({
  i: String,
  x: Number,
  y: Number,
  w: Number,
  h: Number
});

module.exports = mongoose.model('grid-items', GridItem);
