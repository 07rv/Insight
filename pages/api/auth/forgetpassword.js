import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import { hash } from "bcrypt";
const { jwtVerify } = require("jose");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    const { password, token } = req.body;

    try {
      const secretKey = new TextEncoder().encode(process.env.NEXT_SECRET);
      const verifiedPayload = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"],
      });

      const email = verifiedPayload?.payload.email;

      const checkingexisting = await Users.findOne({ email });
      if (!checkingexisting)
        res.status(422).json({ status: 0, error: "No Such User Exit" });

      await checkingexisting.updateOne({
        password: await hash(password, 12),
      });
      res.status(200).json({ status: 1, user: checkingexisting });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
