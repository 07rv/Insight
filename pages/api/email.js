import dbConnect from "@/database/mongodb";
import Emails from "@/modal/Email";
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    try {
      const { name, email, message } = req.body;
      const newEmail = new Emails({
        name: name,
        emailid: email,
        message: message,
      });
      newEmail.save();
      res.status(200).json({ status: 1, email: req.body });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
