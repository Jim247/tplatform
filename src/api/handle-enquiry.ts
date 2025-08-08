import { sendEnquiryConfirmationEmail } from './confirm-enquiry-email';
import { NextApiRequest, NextApiResponse } from 'next';
import { notifyOfficeEmail } from './notify-office-email';
import { sendMailtrapEmail } from '@utils/sendMailtrapEmail'; // Assuming you have a utility for sending emails

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  } catch (error) {
    console.error('Error processing enquiry:', error);

    // Send error notification email
    try {
      const errorNotificationEmail = 'jim@tempotuition.co.uk'; // Replace with your admin/office email
      const subject = 'Error Processing Enquiry';

      // Narrow the type of `error` to `Error`
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace available';

      const message = `
An error occurred while processing an enquiry:

Error Message: ${errorMessage}
Stack Trace: ${errorStack}

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
      console.error(
        'Error sending notification email:',
        emailError instanceof Error ? emailError.message : 'Unknown error'
      );
    }

    // Respond with error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}
