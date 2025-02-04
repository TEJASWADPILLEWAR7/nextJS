import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";

export const sendEmail = async (email, emailType, userId: any) => {
  try {
    if (!userId) {
      throw new Error("User ID is undefined in sendEmail()");
    }

    console.log("Received userId in sendEmail():", userId);
    console.log("Type of userId:", typeof userId);

    // Await the hashing to resolve the Promise before using the result
    const hashedToken = await bcrypt.hash(userId.toString(), 12);
    console.log("Hashed token generated:", hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODE_USER,
        pass: process.env.NODE_PASS,
      },
    });

    const mailOptions = {
      from: "tejaswadpillewar7@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);

    return mailresponse;
  } catch (error) {
    console.log(error.message);
  }
};
