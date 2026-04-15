const ContactMessage = require('../models/ContactMessage');
const sendEmail = require('../utils/sendEmail');

exports.sendMessage = async (req, res) => {
  try {
    // Save to MongoDB
    const message = await ContactMessage.create(req.body);

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; border: 1px solid #2A2A2A; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #A88A42, #C8A35F, #D4B878); padding: 24px; text-align: center;">
          <h1 style="color: #0A0A0A; margin: 0; font-size: 24px;">Siddiqui Motors</h1>
          <p style="color: #0A0A0A; margin: 4px 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #C8A35F; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #ffffff;">${message.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #C8A35F; font-weight: bold;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #ffffff;"><a href="mailto:${message.email}" style="color: #C8A35F;">${message.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #C8A35F; font-weight: bold;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #ffffff;">${message.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #C8A35F; font-weight: bold;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; color: #ffffff;">${message.subject || 'No subject'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #111111; border-radius: 8px; border-left: 3px solid #C8A35F;">
            <p style="color: #C8A35F; font-weight: bold; margin: 0 0 8px;">Message:</p>
            <p style="color: #cccccc; margin: 0; line-height: 1.6;">${message.message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
            Received on ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}
          </p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: adminEmail,
        subject: `New Contact: ${message.subject || message.name} - Siddiqui Motors`,
        html: emailHtml,
      });
    } catch (emailErr) {
      // Email failed but message is saved - don't fail the request
      console.error('Email notification failed:', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort('-createdAt');
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
