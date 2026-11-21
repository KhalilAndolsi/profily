import LinkPageModel from "../models/LinkPageModel.js";

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

const getFormData = (body, file) => {
  const data = { ...body };

  if (data.links !== undefined) {
    data.links = parseArrayField(data.links);
  }
  if (data.isPublic !== undefined) {
    data.isPublic = data.isPublic === true || data.isPublic === "true";
  }

  delete data.owner;
  if (file) data.photo = `/uploads/${file.filename}`;
  else delete data.photo;

  return data;
};

export const createLinkPage = async (req, res, next) => {
  try {
    const linkPage = await LinkPageModel.create({
      ...getFormData(req.body, req.file),
      owner: req.userId,
    });

    return res.status(201).json({
      message: "Links page created successfully",
      linkPage,
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid links page data",
        errors: formatError(error),
      });
    }
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Username is already in use" });
    }
    return next(error);
  }
};

export const getPublicLinkPages = async (req, res, next) => {
  try {
    const linkPages = await LinkPageModel.find({ isPublic: true }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Public links pages fetched successfully",
      linkPages,
    });
  } catch (error) {
    return next(error);
  }
};

export const getMyLinkPages = async (req, res, next) => {
  try {
    const linkPages = await LinkPageModel.find({ owner: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Your links pages fetched successfully",
      linkPages,
    });
  } catch (error) {
    return next(error);
  }
};

export const getPublicLinkPage = async (req, res, next) => {
  try {
    const linkPage = await LinkPageModel.findOne({
      username: req.params.username.toLowerCase(),
      isPublic: true,
    });

    if (!linkPage) {
      return res.status(404).json({ message: "Public links page not found" });
    }

    return res.status(200).json({
      message: "Public links page fetched successfully",
      linkPage,
    });
  } catch (error) {
    return next(error);
  }
};

export const getMyLinkPage = async (req, res, next) => {
  try {
    const linkPage = await LinkPageModel.findOne({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!linkPage) {
      return res.status(404).json({ message: "Links page not found" });
    }

    return res.status(200).json({
      message: "Links page fetched successfully",
      linkPage,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({ message: "Invalid links page ID" });
    }
    return next(error);
  }
};

export const updateLinkPage = async (req, res, next) => {
  try {
    const linkPage = await LinkPageModel.findOne({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!linkPage) {
      return res.status(404).json({ message: "Links page not found" });
    }

    const updates = getFormData(req.body, req.file);
    Object.assign(linkPage, updates);
    await linkPage.save();

    return res.status(200).json({
      message: "Links page updated successfully",
      linkPage,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({ message: "Invalid links page ID" });
    }
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid links page data",
        errors: formatError(error),
      });
    }
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Username is already in use" });
    }
    return next(error);
  }
};

export const deleteLinkPage = async (req, res, next) => {
  try {
    const linkPage = await LinkPageModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!linkPage) {
      return res.status(404).json({ message: "Links page not found" });
    }

    return res.status(200).json({
      message: "Links page deleted successfully",
      linkPage,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({ message: "Invalid links page ID" });
    }
    return next(error);
  }
};

export const deleteMyLinkPages = async (req, res, next) => {
  try {
    const result = await LinkPageModel.deleteMany({ owner: req.userId });
    return res.status(200).json({
      message: "All your links pages deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return next(error);
  }
};
