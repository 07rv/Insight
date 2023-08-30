import dbConnect from "@/database/mongodb";
import Category from "@/modal/Category";
import Posts from "@/modal/Post";
import User from "@/modal/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const user = await User.findById(id);
      if (user) {
        const posts = await Posts.find({ author: user._id })
          .populate("author", ["email", "name"])
          .populate("category", ["value", "label", "color"])
          .sort({ createdAt: -1 });

        res.status(200).json({ status: 1, posts: posts, author: user.name });
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
