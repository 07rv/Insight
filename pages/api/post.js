import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import Posts from "@/modal/Post";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    try {
      const { title, content, cover } = req.body;
      res.status(200).json({ status: 0, error: req.body });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
