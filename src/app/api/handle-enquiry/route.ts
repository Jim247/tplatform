import { sendEnquiryConfirmationEmail } from '../../../api/confirm-enquiry-email';
import { notifyOfficeEmail } from '../../../api/notify-office';
import { NextRequest, NextResponse } from 'next/server';
import { EnquiryNotification } from '@/constants/email';
import { enquiryErrorEmail } from '@/api/enquiry-email-err';

export async function POST(request: NextRequest) {
  let enquirerDetails: EnquiryNotification | undefined;

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

    // Try to send error notification email, but always return the error response
    try {
      await enquiryErrorEmail(enquirerDetails, error);
    } catch (emailError) {
      console.error('Error sending error notification email:', emailError);
    }

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
