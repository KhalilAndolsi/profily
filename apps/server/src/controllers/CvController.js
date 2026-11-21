import CvModel from "../models/CvModel.js";

export const getAllCvs = async (req, res, next) => {
  try {
    const cvs = await CvModel.find({ isPublic: true }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Public CVs fetched successfully",
      cvs,
    });
  } catch (error) {
    return next(error);
  }
};

export const getMyCvs = async (req, res, next) => {
  try {
    const cvs = await CvModel.find({ owner: req.userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Your CVs fetched successfully",
      cvs,
    });
  } catch (error) {
    return next(error);
  }
};

export const getPublicCv = async (req, res, next) => {
  try {
    const cv = await CvModel.findOne({
      _id: req.params.id,
      isPublic: true,
    });

    if (!cv) {
      return res.status(404).json({
        message: "Public CV not found",
      });
    }

    return res.status(200).json({
      message: "Public CV fetched successfully",
      cv,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({
        message: "Invalid CV ID",
      });
    }

    return next(error);
  }
};

export const getMyCv = async (req, res, next) => {
  try {
    const cv = await CvModel.findOne({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    return res.status(200).json({
      message: "CV fetched successfully",
      cv,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({
        message: "Invalid CV ID",
      });
    }

    return next(error);
  }
};

export const deleteCv = async (req, res, next) => {
  try {
    const cv = await CvModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    return res.status(200).json({
      message: "CV deleted successfully",
      cv,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({
        message: "Invalid CV ID",
      });
    }

    return next(error);
  }
};

export const deleteMyCvs = async (req, res, next) => {
  try {
    const result = await CvModel.deleteMany({ owner: req.userId });
    return res.status(200).json({
      message: "All your CVs deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateCv = async (req, res, next) => {
  try {
    const cv = await CvModel.findOne({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

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

    const updates = { ...req.body };
    [
      "experience",
      "education",
      "skills",
      "languages",
      "projects",
      "certifications",
      "links",
    ].forEach((field) => {
      if (updates[field] !== undefined) {
        updates[field] = parseArrayField(updates[field]);
      }
    });

    if (updates.isPublic !== undefined) {
      updates.isPublic =
        updates.isPublic === true || updates.isPublic === "true";
    }
    delete updates.owner;

    if (req.file) {
      updates.photo = `/uploads/${req.file.filename}`;
    } else {
      delete updates.photo;
    }

    Object.assign(cv, updates);
    await cv.save();

    return res.status(200).json({
      message: "CV updated successfully",
      cv,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(400).json({
        message: "Invalid CV ID",
      });
    }
    if (error?.name === "ValidationError") {
      const errors = Object.values(error.errors).map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      }));

      return res.status(400).json({
        message: "Invalid CV data",
        errors,
      });
    }

    return next(error);
  }
};

export const createCv = async (req, res, next) => {
  try {
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

    const formData = { ...req.body };
    ["experience", "education", "skills", "languages", "projects", "certifications", "links"].forEach(
      (field) => {
        formData[field] = parseArrayField(formData[field]);
      },
    );
    formData.isPublic =
      formData.isPublic === true || formData.isPublic === "true";
    delete formData.owner;
    if (req.file) {
      formData.photo = `/uploads/${req.file.filename}`;
    } else {
      delete formData.photo;
    }

    const cv = await CvModel.create({
      ...formData,
      owner: req.userId,
    });

    return res.status(201).json({
      message: "CV created successfully",
      cv,
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      const errors = Object.values(error.errors).map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      }));

      return res.status(400).json({
        message: "Invalid CV data",
        errors,
      });
    }

    return next(error);
  }
};
