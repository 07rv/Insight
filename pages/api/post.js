import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import Posts from "@/modal/Post";
import Category from "@/modal/Category";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const { query } = req;
    if (query && query.id) {
      try {
        const id = query.id;
        const post = await Posts.findById(id)
          .populate("author", ["email", "name", "profileImg", "about"])
          .populate("category", ["value", "label", "color"]);
        res.status(200).json({ status: 1, post: post });
      } catch (error) {
        res.status(500).json({ status: 0, error: error });
      }
    } else {
      try {
        const { limit } = req.query;
        const posts = await Posts.find()
          .populate("author", ["email", "name", "profileImg", "about"])
          .populate("category", ["value", "label", "color"])
          .sort({ createdAt: -1 })
          .limit(limit ? parseInt(limit) : undefined);
        res.status(200).json({ status: 1, posts: posts });
      } catch (error) {
        res.status(500).json({ status: 0, error: error });
      }
    }
  } else if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    try {
      const { title, content, cover, email, category } = req.body;
      const checkingexisting = await Users.findOne({ email });

      if (!checkingexisting)
        res.status(422).json({ status: 0, error: "Please register first" });
      else {
        const postCategory = await Category.findOne({ _id: category });
        const newpost = new Posts({
          title,
          content,
          cover,
          category: [postCategory._id],
          author: checkingexisting._id,
        });
        newpost.save();
        res.status(200).json({ status: 1, post: newpost });
      }
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else if (req.method === "PUT") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });
    try {
      const { title, content, email, category, _id } = req.body;
      const checkingexisting = await Users.findOne({ email });

      if (!checkingexisting)
        res.status(422).json({ status: 0, error: "Please register first" });
      else {
        const checkingexistingPost = await Posts.findById({ _id: _id });
        if (!checkingexistingPost) {
          res.status(422).json({ status: 0, error: "No such post exit" });
        }
        const postCategory = await Category.findOne({ _id: category });
        await checkingexistingPost.updateOne({
          title,
          content,
          category: [postCategory._id],
        });
        res.status(200).json({ status: 1, post: checkingexistingPost });
      }
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
