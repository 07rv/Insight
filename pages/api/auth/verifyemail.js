import dbConnect from "@/database/mongodb";
const { jwtVerify } = require("jose");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { token } = req.body;
    try {
      const secretKey = new TextEncoder().encode(process.env.NEXT_SECRET);
      const verifiedPayload = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"],
      });
      res.status(200).json({ status: 1, user: verifiedPayload?.payload.email });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
