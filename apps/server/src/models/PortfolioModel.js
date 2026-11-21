import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true, default: null },
    description: { type: String, trim: true },
    achievements: [{ type: String, trim: true }],
  },
  { _id: true },
);

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true, default: null },
  },
  { _id: true },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true, default: null },
    url: { type: String, trim: true },
    repository: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
  },
  { _id: true },
);

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: true },
);

const portfolioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
    headline: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    location: { type: String, required: true, trim: true },
    isPublic: { type: Boolean, default: true },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [{ type: String, trim: true }],
    languages: [
      {
        name: { type: String, trim: true },
        level: { type: String, trim: true },
      },
    ],
    projects: [projectSchema],
    certifications: [
      {
        name: { type: String, trim: true },
        issuer: { type: String, trim: true },
        date: { type: String, trim: true },
      },
    ],
    links: [linkSchema],
  },
  { timestamps: true },
);

const PortfolioModel = mongoose.model("Portfolio", portfolioSchema);

export default PortfolioModel;
