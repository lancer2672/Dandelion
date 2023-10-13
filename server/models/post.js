const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Tao model
const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      content: String,
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      // repliedUserId: {
      //   type: Schema.Types.ObjectId,
      //   ref: "user",
      // },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
const PostSchema = new Schema(
  {
    description: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        createdAt: String,
      },
    ],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
