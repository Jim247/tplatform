import { sendEnquiryConfirmationEmail, EnquiryNotification } from '../../../api/confirm-enquiry-email';
import { notifyOfficeEmail } from '../../../api/notify-office';
import { sendMailtrapEmail } from '@utils/sendMailtrapEmail';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let enquirerDetails: EnquiryNotification | null = null;
  
  try {
    // Extract the enquirer details from the request body
    const rawData = await request.json();
    enquirerDetails = rawData as EnquiryNotification;

    if (!enquirerDetails || !enquirerDetails.email) {
      return NextResponse.json(
        { error: 'Invalid request: Missing enquirer details or email' },
        { status: 400 }
      );
    }

    // Pass the enquirer details to the confirmation email function
    await sendEnquiryConfirmationEmail(enquirerDetails);

    // Notify the office
    await notifyOfficeEmail(enquirerDetails);

    // Respond with success
    return NextResponse.json({ 
      message: 'Enquiry processed and confirmation email sent successfully' 
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);

    // Send error notification email
    try {
      const errorNotificationEmail = 'jim@tempotuition.co.uk';
      const subject = 'Error Processing Enquiry';

      // Narrow the type of `error` to `Error`
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace available';

      const message = `
An error occurred while processing an enquiry:

Error Message: ${errorMessage}
Stack Trace: ${errorStack}

Payload:
${JSON.stringify(enquirerDetails || 'No data available', null, 2)}

Please investigate the issue as soon as possible.
      `;

      await sendMailtrapEmail({
        to: errorNotificationEmail,
        subject,
        message,
      });
    } catch (emailError) {
      console.error('Error sending notification email:', emailError instanceof Error ? emailError.message : 'Unknown error');
    }

    // Respond with error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
