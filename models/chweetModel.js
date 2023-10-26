const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chweetSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
      trim: true,
      maxLength: 250,
      message: "Post must be less than 250 characters",
    },
    imageURL: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

chweetSchema.virtual("s3ObjecID").get(function () {
  const deconstructedURL = this.imageURL.split("/");
  const s3ObjectID = deconstructedURL[deconstructedURL.length - 1];
  return s3ObjectID;
});

module.exports = model("Chweet", chweetSchema);
