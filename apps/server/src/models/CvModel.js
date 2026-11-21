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

const languageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["Native", "Fluent", "Professional", "Intermediate", "Basic"],
      required: true,
    },
  },
  { _id: true },
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    url: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
  },
  { _id: true },
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, trim: true },
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

const cvSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    photo: { type: String, trim: true, default: null },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    summary: { type: String, required: true, trim: true },
    template: {
      type: String,
      enum: ["classic", "modern"],
      default: "classic",
    },
    isPublic: { type: Boolean, default: true },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [{ type: String, trim: true }],
    languages: [languageSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    links: [linkSchema],
  },
  {
    timestamps: true,
  },
);

const CvModel = mongoose.model("Cv", cvSchema);

export default CvModel;
