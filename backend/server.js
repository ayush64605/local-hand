import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "savaliyaayush2295@gmail.com", // Replace with your email
    pass: "", // Replace with your generated app password
  },
});

app.post("/send-provider-email", async (req, res) => {
  try {
    const { name, email, password } = req.body; // Receive password from frontend

    const mailOptions = {
      from: "savaliyaayush2295@gmail.com",
      to: email,
      subject: "Your Account Password",
      text: `Hello ${name},\n\nYour account has been created successfully. Here is your password: ${password}\n\nThank you for joining us!`,
    };

   
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email.");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent successfully." });
      }
    });
  } catch (error) {
    console.error("Error in email sending:", error);
    res.status(500).send("Server error.");
  }
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
