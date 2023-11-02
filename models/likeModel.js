const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new Schema(
  {
    chweet: {
      type: Schema.Types.ObjectId,
      ref: "Chweet",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Like", likeSchema);
