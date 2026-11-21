import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: true },
);

const linkPageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 50,
      match: [/^[a-z0-9-]+$/, "Username may only contain lowercase letters, numbers, and hyphens"],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    isPublic: { type: Boolean, default: true },
    links: {
      type: [linkSchema],
      validate: {
        validator: (links) => links.length > 0,
        message: "At least one link is required",
      },
    },
  },
  { timestamps: true },
);

const LinkPageModel = mongoose.model("LinkPage", linkPageSchema);

export default LinkPageModel;
