import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  // For Gmail or similar
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
      }
    });
  }
  
  // For other SMTP servers
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

/**
 * Send email notification for contact form submission
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} - Email send result
 */
export const sendContactFormEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const { name, email, subject, message } = contactData;
    
    // Email to admin
    const mailOptions = {
      from: `"Srajnik Lab Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_RECIPIENT || 'srajnik@shiksha-sopan.org',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; }
            .header { background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .info-row { margin: 15px 0; padding: 10px; background: #f3f4f6; border-left: 4px solid #2563eb; }
            .label { font-weight: bold; color: #2563eb; }
            .message-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Srajnik Lab Website</p>
            </div>
            <div class="content">
              <p>You have received a new contact form submission:</p>
              
              <div class="info-row">
                <span class="label">Name:</span> ${name}
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              
              <div class="info-row">
                <span class="label">Subject:</span> ${subject}
              </div>
              
              <div class="message-box">
                <div class="label">Message:</div>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div class="footer">
                <p>This email was automatically generated from the Srajnik Lab website contact form.</p>
                <p>Submitted on: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submitted on: ${new Date().toLocaleString()}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};

/**
 * Send auto-reply to contact form submitter
 * @param {String} recipientEmail - Email of the person who submitted the form
 * @param {String} recipientName - Name of the person who submitted the form
 * @returns {Promise<Object>} - Email send result
 */
export const sendContactFormAutoReply = async (recipientEmail, recipientName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Srajnik Lab" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: 'Thank you for contacting Srajnik Lab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; }
            .header { background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Srajnik Lab</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for reaching out!</p>
            </div>
            <div class="content">
              <p>Dear ${recipientName},</p>
              
              <p>Thank you for contacting Srajnik Lab. We have received your message and will get back to you as soon as possible.</p>
              
              <p>Our team typically responds within 24-48 hours during business days.</p>
              
              <p>If you have any urgent inquiries, please feel free to reach out to us directly at <a href="mailto:srajnik@shiksha-sopan.org">srajnik@shiksha-sopan.org</a>.</p>
              
              <p>Best regards,<br>
              <strong>Srajnik Lab Team</strong></p>
              
              <div class="footer">
                <p>Shiksha Sopan, Nankari, IIT Kanpur Campus, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Dear ${recipientName},

Thank you for contacting Srajnik Lab. We have received your message and will get back to you as soon as possible.

Our team typically responds within 24-48 hours during business days.

If you have any urgent inquiries, please feel free to reach out to us directly at srajnik@shiksha-sopan.org.

Best regards,
Srajnik Lab Team

Shiksha Sopan, Nankari, IIT Kanpur Campus, Uttar Pradesh, India
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent:', info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    // Don't throw error for auto-reply failure - it's not critical
    return { success: false, error: error.message };
  }
};
