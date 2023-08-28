import dbConnect from "@/database/mongodb";
import Category from "@/modal/Category";
import Posts from "@/modal/Post";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const category = await Category.findById(id);
      if (category) {
        const posts = await Posts.find({ category: category._id })
          .populate("author", ["email", "name"])
          .populate("category", ["value", "label", "color"])
          .sort({ createdAt: -1 });

        res
          .status(200)
          .json({ status: 1, posts: posts, category: category.label });
      } else {
        res.status(500).json({ status: 0, error: "No such category" });
      }
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
