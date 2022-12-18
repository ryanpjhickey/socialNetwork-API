const { Schema, model } = require('mongoose');

const userModel = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  },
)
userModel.virtual('friendCount').get(function () {
  return this.friends.length;
})
const Users = model('Users', userModel);

module.exports = Users;