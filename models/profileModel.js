const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      default: "",
      minLength: 3,
      maxLength: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      default: "",
      minLength: 3,
      maxLength: 20,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    location: {
      type: String,
      trim: true,
      maxLength: 30,
    },
    website: {
      type: String,
      trim: true,
      maxLength: 30,
    },
    headerPicture: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
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

profileSchema.virtual("headerPictureS3ObjectID").get(function () {
  const deconstructedURL = this.headerPicture.split("/");
  const s3ObjectID = deconstructedURL[deconstructedURL.length - 1];
  return s3ObjectID;
});

profileSchema.virtual("profilePictureS3ObjectID").get(function () {
  const deconstructedURL = this.profilePicture.split("/");
  const s3ObjectID = deconstructedURL[deconstructedURL.length - 1];
  return s3ObjectID;
});

module.exports = model("Profile", profileSchema);
