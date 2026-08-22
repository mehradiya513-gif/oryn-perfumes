import nodemailer from 'nodemailer';

// Uses credentials from environment variables, or falls back to a test account logic
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // User should put their email here
    pass: process.env.EMAIL_PASS || 'your-app-password', // User should put their App Password here
  },
});

export const sendOrderDispatchedEmail = async (customerEmail: string, orderId: string, customerName: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Oryn Perfumes" <${process.env.EMAIL_USER || 'noreply@oryn.com'}>`, // sender address
      to: customerEmail, // list of receivers
      subject: `Your Oryn Order #${orderId} has been Dispatched! 🚚`, // Subject line
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h2 style="color: #4a5d23; text-align: center; font-family: serif; font-style: italic;">Oryn Perfumes</h2>
          <p>Hello ${customerName},</p>
          <p>Great news! Your order <strong>#${orderId}</strong> has been carefully packaged and is now on its way to you.</p>
          <p>We hope you enjoy your new fragrance!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>If you have any questions, please reply to this email.</p>
            <p>Thank you for choosing Oryn Perfumes.</p>
          </div>
        </div>
      `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
