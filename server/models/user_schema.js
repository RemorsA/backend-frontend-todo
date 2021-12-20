const { Schema, model, isValidObjectId } = require('mongoose');

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
);

module.exports = model('users', userSchema);
