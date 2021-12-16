const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
);

module.exports = model('users', userSchema);
