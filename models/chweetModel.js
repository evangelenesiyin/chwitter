const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chweetSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: {
        values: ["Cat", "Dog", "Rabbit", "Bird", "Hamster", "Others"],
      },
    },
    breed: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Not sure"],
    },
    sterilised: {
      type: String,
      required: true,
      enum: ["Yes", "No", "Not sure"],
    },
    contactDetails: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      maxLength: 100,
    },
    imageURL: {
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

chweetSchema.virtual("s3ObjectID").get(function () {
  const deconstructedURL = this.imageURL.split("/");
  const s3ObjectID = deconstructedURL[deconstructedURL.length - 1];
  return s3ObjectID;
});

module.exports = model("Chweet", chweetSchema);
