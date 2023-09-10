import { EmailVerificationTemplate } from "@/components/ui/EmailVerificationTemplate";
import { EmailForgetPasswordTemplate } from "@/components/ui/EmailForgetPasswordTemplate";
import Users from "@/modal/User";
import dbConnect from "@/database/mongodb";
const { SignJWT } = require("jose");
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    if (!req.body)
      res.status(404).json({ status: 0, error: "Don't have body" });

    try {
      const { EmailId, Name, Type } = req.body;
      const checkingexisting = await Users.findOne({ email: EmailId });
      if (!checkingexisting)
        res.status(422).json({ status: 0, error: "Please register first" });
      else {
        const secretKey = new TextEncoder().encode(process.env.NEXT_SECRET);

        const jwt = await new SignJWT({ email: EmailId })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setIssuer("InsightBlog")
          .setExpirationTime("10m")
          .sign(secretKey);

        var emailBody = "";
        if (Type === "ForgetPassword") {
          emailBody = EmailForgetPasswordTemplate(
            jwt,
            checkingexisting.name,
            process.env.NEXT_PUBLIC_BASE_URL
          );
        } else if (Type === "EmailVerification") {
          emailBody = EmailVerificationTemplate(
            jwt,
            Name,
            process.env.NEXT_PUBLIC_BASE_URL
          );
        }

        if (emailBody) {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NEXT_NODEEMAILID,
              pass: process.env.NEXT_NODEEMAILKEY,
            },
          });

          var mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: EmailId,
            subject: "Email Verification",
            html: emailBody,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.status(500).json({ status: 0, error: error });
            } else {
              res.status(200).json({ status: 1, jwt: jwt });
            }
          });
        } else {
          res.status(500).json({ status: 0, error: "Something went wrong" });
        }
      }
    } catch (error) {
      res.status(500).json({ status: 0, error: error });
    }
  } else {
    res.status(500).json({ status: 0, error: "HTTP method not valid" });
  }
}
