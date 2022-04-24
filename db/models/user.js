var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  id: {
    type: String,
    default: "0", 
  },
  name: {
    type: String,
    default: 'No Name'
  },
  age: {
    type: String,
    default: 'No Type'
  },
  avatar: {
    type: String,
    default: 'https://taimienphi.vn/tmp/cf/aut/hinh-nen-girl-xinh-1.jpg'
  },
  matches: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model('User', userSchema, 'User');
