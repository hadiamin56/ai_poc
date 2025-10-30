 const nodemailer = require('nodemailer');

 let transporter;

// Function to create transporter with fallback
const createTransporter = async () => {
  // Try STARTTLS (port 587)
  try {
    let t = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await t.verify(); // Test connection
    console.log("SMTP ready using port 587 (STARTTLS)");
    return t;
  } catch (err) {
    console.warn("Port 587 failed, trying 465 (SSL)...", err.message);

    // Fallback to SSL (port 465)
    let t = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await t.verify(); // Test connection
    console.log("SMTP ready using port 465 (SSL)");
    return t;
  }
};

// Initialize transporter
const initTransporter = async () => {
  transporter = await createTransporter();
};
initTransporter();

// Send OTP email
const sendOtpEmail = async (to, otp) => {
  if (!transporter) await initTransporter();

  const mailOptions = {
    from: `"No Reply" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Your Email Verification OTP',
    html: `<p>Your OTP for email verification is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
