import { EnquiryNotification } from '@/constants/email';
import { sendMailtrapEmail } from '@/utils/sendMailtrapEmail';
import { NextResponse } from 'next/server';

export async function enquiryErrorEmail(
  enquiryDetails: EnquiryNotification | undefined,
  error: unknown
) {
  const errorNotificationEmail = 'jim@tempotuition.co.uk';
  const subject = 'Error Processing Enquiry';

  const errorMessage =
    error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
  const errorStack =
    error instanceof Error && error.stack ? error.stack : 'No stack trace available';

  const customerInfo = enquiryDetails?.booking_owner
    ? `Customer: ${enquiryDetails.booking_owner.first_name} ${enquiryDetails.booking_owner.last_name} (${enquiryDetails.booking_owner.email})`
    : 'No customer data available';

  const message = `
An error occurred while processing an enquiry:

${customerInfo}

Error Message: ${errorMessage}
Stack Trace: ${errorStack}

Full Payload:
${JSON.stringify(enquiryDetails || 'No data available', null, 2)}

Please investigate the issue as soon as possible.
  `;

  try {
    await sendMailtrapEmail({
      to: errorNotificationEmail,
      subject,
      message,
    });
  } catch (emailError) {
    console.error(
      'Error sending notification email:',
      emailError instanceof Error ? emailError.message : String(emailError)
    );
  }

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
