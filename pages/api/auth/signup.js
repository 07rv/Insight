import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    const { name, email, password } = req.body;
    const checkingexisting = await Users.findOne({ email });

    if (checkingexisting)
      res.status(422).json({ status: 0, error: "User Already exists" });
    else {
      try {
        const newuser = new Users({
          name: name,
          email: email,
          password: await hash(password, 12),
          about: "",
        });

        newuser.save();
        res.status(200).json({ status: 1, user: newuser });
      } catch (error) {
        res.status(500).json({ status: 0, error: error });
      }
    }
  } else if (req.method === "PUT") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    const { name, email, about, profileImg } = req.body;
    const checkingexisting = await Users.findOne({ email });

    if (!checkingexisting)
      res.status(422).json({ status: 0, error: "User Not exists" });
    else {
      await checkingexisting.updateOne({
        name,
        email,
        about,
        profileImg,
      });
      res.status(200).json({ status: 1, author: checkingexisting });
    }

    try {
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
