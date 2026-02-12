# Email Configuration Guide

## Setting Up Email Notifications for Contact Form

The contact form now sends email notifications to `srajnik@shiksha-sopan.org` when someone submits the form, and also sends an auto-reply to the submitter.

## Configuration Steps

### Option 1: Using Gmail (Recommended for initial setup)

1. **Update `.env` file** with these values:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL_RECIPIENT=srajnik@shiksha-sopan.org
   ```

2. **Create Gmail App Password:**
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Generate a new app password for "Mail"
   - Copy the 16-character password
   - Use this password in `EMAIL_PASSWORD` (not your regular Gmail password)

### Option 2: Using Custom SMTP Server

1. **Update `.env` file**:
   ```env
   EMAIL_SERVICE=smtp
   EMAIL_HOST=smtp.your-domain.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@your-domain.com
   EMAIL_PASSWORD=your-password
   CONTACT_EMAIL_RECIPIENT=srajnik@shiksha-sopan.org
   ```

2. **Common SMTP Settings:**
   - **Gmail:** smtp.gmail.com, port 587
   - **Outlook/Office365:** smtp.office365.com, port 587
   - **Yahoo:** smtp.mail.yahoo.com, port 587
   - **Custom domain:** Check with your email provider

## Features Implemented

### 1. Admin Notification Email
When someone submits the contact form, an email is sent to `srajnik@shiksha-sopan.org` with:
- Sender's name
- Sender's email
- Subject
- Message content
- Timestamp
- Professional HTML formatting

### 2. Auto-Reply Email
The person who submits the form receives an automatic thank you email with:
- Acknowledgment of their submission
- Expected response time (24-48 hours)
- Contact information for urgent inquiries
- Professional branding

### 3. Frontend Improvements
- ✅ Submit button disabled during submission
- ✅ Loading spinner while sending
- ✅ Success message after successful submission
- ✅ Error message if submission fails
- ✅ Form reset after successful submission
- ✅ Prevention of multiple submissions

## Testing

### Test Email Functionality

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Configure your email settings** in `.env`

3. **Submit a test message** through the contact form

4. **Check console output** for email sending status:
   ```
   ✓ Contact form email sent to admin
   ✓ Auto-reply email sent to submitter
   ```

### Troubleshooting

**If emails are not sending:**

1. **Check console for errors** - detailed error messages will appear in backend console

2. **Verify .env configuration:**
   ```bash
   # In backend directory
   cat .env | grep EMAIL
   ```

3. **Common issues:**
   - Gmail: Make sure you're using an App Password, not your regular password
   - 2FA: App passwords are required if you have 2-factor authentication enabled
   - SMTP: Verify host and port settings with your email provider
   - Firewall: Ensure outbound SMTP ports are not blocked

4. **Email still saves to database** even if email sending fails - contacts are never lost

## Email Templates

Both emails use professional HTML templates with:
- Gradient headers
- Responsive design
- Clean formatting
- Brand colors (blue/indigo)
- Fallback plain text versions

## Security Notes

- Never commit `.env` file to git
- Use App Passwords for Gmail (not regular passwords)
- Emails are sent asynchronously - form submission won't fail if email fails
- All email errors are logged but don't prevent contact from being saved

## Production Recommendations

For production deployment:
1. Use a professional email service (SendGrid, AWS SES, Mailgun)
2. Implement rate limiting on contact form
3. Add CAPTCHA to prevent spam
4. Monitor email delivery rates
5. Set up email bounce handling
6. Use a dedicated email address for sending (e.g., noreply@srajniklab.org)

## Support

If you need help configuring email:
1. Check backend console for detailed error messages
2. Verify all EMAIL_* environment variables are set correctly
3. Test with Gmail App Password first (easiest to set up)
4. Contact forms are always saved to database regardless of email status
