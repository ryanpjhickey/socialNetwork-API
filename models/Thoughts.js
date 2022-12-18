const { Schema, model, Types } = require('mongoose');

const reactionModel = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const thoughtModel = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionModel]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)
thoughtModel.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
const Thoughts = model('Thoughts', thoughtModel);


module.exports = Thoughts;