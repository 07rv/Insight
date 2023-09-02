import dbConnect from "@/database/mongodb";
const { SignJWT } = require("jose");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    try {
      const { EmailId } = req.body;
      const secretKey = new TextEncoder().encode(process.env.NEXT_SECRET);

      const jwt = await new SignJWT({ email: EmailId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer("InsightBlog")
        .setExpirationTime("10m")
        .sign(secretKey);
      res.status(200).json({ status: 1, jwt: jwt });
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
