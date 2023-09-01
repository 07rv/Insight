import dbConnect from "@/database/mongodb";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { token } = req.body;
    res.status(200).json({ status: 1, user: token });
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
