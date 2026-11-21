import PortfolioModel from "../models/PortfolioModel.js";

const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const formatError = (error) =>
  Object.values(error.errors).map((item) => ({
    field: item.path,
    message: item.message,
  }));

const getFormData = (body, files) => {
  const data = { ...body };
  ["experience", "education", "skills", "languages", "projects", "certifications", "links"].forEach((field) => {
    if (data[field] !== undefined) data[field] = parseArrayField(data[field]);
  });
  if (data.isPublic !== undefined) {
    data.isPublic = data.isPublic === true || data.isPublic === "true";
  }
  delete data.owner;

  if (files?.photo?.[0]) data.photo = `/uploads/${files.photo[0].filename}`;
  else delete data.photo;

  if (Array.isArray(data.projects) && files?.projectImages) {
    data.projects = data.projects.map((project, index) => {
      if (files.projectImages[index]) {
        return { ...project, image: `/uploads/${files.projectImages[index].filename}` };
      }
      return project;
    });
  }
  return data;
};

export const createPortfolio = async (req, res, next) => {
  try {
    const portfolio = await PortfolioModel.create({
      ...getFormData(req.body, req.files),
      owner: req.userId,
    });
    return res.status(201).json({ message: "Portfolio created successfully", portfolio });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid portfolio data", errors: formatError(error) });
    }
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Username is already in use" });
    }
    return next(error);
  }
};

export const getPublicPortfolios = async (req, res, next) => {
  try {
    const portfolios = await PortfolioModel.find({ isPublic: true }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Public portfolios fetched successfully", portfolios });
  } catch (error) { return next(error); }
};

export const getMyPortfolios = async (req, res, next) => {
  try {
    const portfolios = await PortfolioModel.find({ owner: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Your portfolios fetched successfully", portfolios });
  } catch (error) { return next(error); }
};

export const getPublicPortfolio = async (req, res, next) => {
  try {
    const portfolio = await PortfolioModel.findOne({ _id: req.params.id, isPublic: true });
    if (!portfolio) return res.status(404).json({ message: "Public portfolio not found" });
    return res.status(200).json({ message: "Public portfolio fetched successfully", portfolio });
  } catch (error) {
    if (error?.name === "CastError") return res.status(400).json({ message: "Invalid portfolio ID" });
    return next(error);
  }
};

export const getMyPortfolio = async (req, res, next) => {
  try {
    const portfolio = await PortfolioModel.findOne({ _id: req.params.id, owner: req.userId });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    return res.status(200).json({ message: "Portfolio fetched successfully", portfolio });
  } catch (error) {
    if (error?.name === "CastError") return res.status(400).json({ message: "Invalid portfolio ID" });
    return next(error);
  }
};

export const updatePortfolio = async (req, res, next) => {
  try {
    const portfolio = await PortfolioModel.findOne({ _id: req.params.id, owner: req.userId });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    const updates = getFormData(req.body, req.files);
    if (!req.files?.photo) delete updates.photo;
    Object.assign(portfolio, updates);
    await portfolio.save();
    return res.status(200).json({ message: "Portfolio updated successfully", portfolio });
  } catch (error) {
    if (error?.name === "CastError") return res.status(400).json({ message: "Invalid portfolio ID" });
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid portfolio data", errors: formatError(error) });
    }
    if (error?.code === 11000) return res.status(409).json({ message: "Username is already in use" });
    return next(error);
  }
};

export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await PortfolioModel.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    return res.status(200).json({ message: "Portfolio deleted successfully", portfolio });
  } catch (error) {
    if (error?.name === "CastError") return res.status(400).json({ message: "Invalid portfolio ID" });
    return next(error);
  }
};

export const deleteMyPortfolios = async (req, res, next) => {
  try {
    const result = await PortfolioModel.deleteMany({ owner: req.userId });
    return res.status(200).json({
      message: "All your portfolios deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return next(error);
  }
};
