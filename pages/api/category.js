import dbConnect from "@/database/mongodb";
import Category from "@/modal/Category";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const categories = await Category.find();

      res.status(200).json({ status: 1, categories: categories });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
