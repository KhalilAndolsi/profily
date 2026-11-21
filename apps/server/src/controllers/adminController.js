import UserModel from "../models/UserModel.js";
import CvModel from "../models/CvModel.js";
import PortfolioModel from "../models/PortfolioModel.js";
import LinkPageModel from "../models/LinkPageModel.js";

export const getDashboard = async (req, res, next) => {
  try {
    const users = await UserModel.find({ role: "user" })
      .select("nickname email createdAt role")
      .sort({ createdAt: -1 });

    const [cvCounts, portfolioCounts, linkPageCounts] = await Promise.all([
      CvModel.aggregate([
        { $group: { _id: "$owner", count: { $sum: 1 } } },
      ]),
      PortfolioModel.aggregate([
        { $group: { _id: "$owner", count: { $sum: 1 } } },
      ]),
      LinkPageModel.aggregate([
        { $group: { _id: "$owner", count: { $sum: 1 } } },
      ]),
    ]);

    const toCountMap = (counts) =>
      new Map(
        counts.map(({ _id, count }) => [String(_id), count]),
      );
    const cvsByUser = toCountMap(cvCounts);
    const portfoliosByUser = toCountMap(portfolioCounts);
    const linksByUser = toCountMap(linkPageCounts);
    const visibleUserIds = new Set(users.map((user) => user.id));
    const sumVisibleCounts = (counts) =>
      [...counts.entries()].reduce(
        (sum, [ownerId, count]) =>
          visibleUserIds.has(ownerId) ? sum + count : sum,
        0,
      );

    return res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        name: user.nickname,
        email: user.email,
        cv: cvsByUser.get(user.id) || 0,
        portfolios: portfoliosByUser.get(user.id) || 0,
        links: linksByUser.get(user.id) || 0,
        joined: user.createdAt,
      })),
      totals: {
        users: users.length,
        cv: sumVisibleCounts(cvsByUser),
        portfolios: sumVisibleCounts(portfoliosByUser),
        links: sumVisibleCounts(linksByUser),
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.userId) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Promise.all([
      CvModel.deleteMany({ owner: user.id }),
      PortfolioModel.deleteMany({ owner: user.id }),
      LinkPageModel.deleteMany({ owner: user.id }),
      UserModel.findByIdAndDelete(user.id),
    ]);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
