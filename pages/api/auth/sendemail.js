import dbConnect from "@/database/mongodb";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    const { EmailId } = req.body;
    res.status(200).json({ status: 1, user: EmailId });
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
