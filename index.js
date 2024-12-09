const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'mail.kabbcompany.com',
  port: 587,
  secure: true,
  auth: {
    user: 'serviceaccount@kabbcompany.com',
    pass: "1ifeisGre@t"
  }
});

app.get("/",(req,res)=>{
  res.send("Hello world")
})


app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'serviceaccount@kabbcompany.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({ 
        message: 'Failed to send email', 
        error: error.message 
      });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
