import { sendEnquiryConfirmationEmail } from './confirm-enquiry-email';
import { notifyOfficeEmail } from './notify-office';
import { sendMailtrapEmail } from '@utils/sendMailtrapEmail'; // Assuming you have a utility for sending emails

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the enquirer details from the request body
    const enquirerDetails = req.body;

    if (!enquirerDetails || !enquirerDetails.email) {
      return res.status(400).json({ error: 'Invalid request: Missing enquirer details or email' });
    }

    // Pass the enquirer details to the confirmation email function
    await sendEnquiryConfirmationEmail(enquirerDetails);

    // Notify the office
    await notifyOfficeEmail(enquirerDetails);

    // Respond with success
    res.status(200).json({ message: 'Enquiry processed and confirmation email sent successfully' });
  } catch (error: any) {
    console.error('Error processing enquiry:', error);

    // Send error notification email
    try {
      const errorNotificationEmail = 'jim@tempotuition.co.uk'; // Replace with your admin/office email
      const subject = 'Error Processing Enquiry';
      const message = `
An error occurred while processing an enquiry:

Error Message: ${error.message || 'Unknown error'}
Stack Trace: ${error.stack || 'No stack trace available'}

Payload:
${JSON.stringify(req.body, null, 2)}

Please investigate the issue as soon as possible.
      `;

      await sendMailtrapEmail({
        to: errorNotificationEmail,
        subject,
        message,
      });
    } catch (emailError) {
      console.error('Failed to send error notification email:', emailError);
    }

    // Respond with error
    res.status(500).json({ error: error.message });
  }
}