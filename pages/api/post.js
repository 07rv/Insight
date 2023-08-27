import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import Posts from "@/modal/Post";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const posts = await Posts.find()
        .populate("author", ["email", "name"])
        .sort({ createdAt: -1 })
        .limit(10);
      res.status(200).json({ status: 1, posts: posts });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
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
        const newpost = new Posts({
          title,
          content,
          cover,
          category: [category],
          author: checkingexisting._id,
        });
        newpost.save();
        res.status(200).json({ status: 1, post: newpost });
      }
      res.status(200).json({ status: 0, error: req.body });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
