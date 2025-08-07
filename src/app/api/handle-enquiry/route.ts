import { sendEnquiryConfirmationEmail } from '../../../api/confirm-enquiry-email';
import { notifyOfficeEmail } from '../../../api/notify-office';
import { NextRequest, NextResponse } from 'next/server';
import { EnquiryNotification } from '@/constants/email';
import { enquiryErrorEmail } from '@/api/enquiry-email-err';
import supabaseServer from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  let enquirerDetails: EnquiryNotification | undefined;

  try {
    // Extract the enquirer details from the request body
    const rawData = await request.json();
    enquirerDetails = rawData as EnquiryNotification;

    if (
      !enquirerDetails ||
      !enquirerDetails.booking_owner ||
      !enquirerDetails.booking_owner.email
    ) {
      return NextResponse.json(
        { error: 'Invalid request: Missing booking owner details or email' },
        { status: 400 }
      );
    }

    if (!enquirerDetails.students || enquirerDetails.students.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: At least one student is required' },
        { status: 400 }
      );
    }

    // Insert booking owner into database
    const { data: bookingOwnerData, error: bookingOwnerError } = await supabaseServer
      .from('booking_owners')
      .insert({
        first_name: enquirerDetails.booking_owner.first_name,
        last_name: enquirerDetails.booking_owner.last_name,
        username: enquirerDetails.booking_owner.username,
        email: enquirerDetails.booking_owner.email,
        phone: enquirerDetails.booking_owner.phone,
        postcode: enquirerDetails.booking_owner.postcode,
        geopoint: enquirerDetails.booking_owner.geopoint,
        ward: enquirerDetails.booking_owner.ward,
        region: enquirerDetails.booking_owner.region,
        city: enquirerDetails.booking_owner.city,
        geopoint_consent: enquirerDetails.booking_owner.geopoint_consent,
      })
      .select()
      .single();

    if (bookingOwnerError) {
      console.error('Error inserting booking owner:', bookingOwnerError);
      throw new Error(`Failed to create booking owner: ${bookingOwnerError.message}`);
    }

    // Use the auto-generated booking owner ID for students
    const bookingOwnerId = bookingOwnerData.id;

    // Insert students into database
    const studentsToInsert = enquirerDetails.students.map((student) => ({
      booking_owner_id: bookingOwnerId,
      name: student.name,
      age: parseInt(student.age),
      level: student.level,
      notes: student.notes,
      instruments: student.instruments,
      is_booking_owner: student.is_booking_owner,
    }));

    const { data: studentsData, error: studentsError } = await supabaseServer
      .from('students')
      .insert(studentsToInsert)
      .select();

    if (studentsError) {
      console.error('Error inserting students:', studentsError);
      throw new Error(`Failed to create students: ${studentsError.message}`);
    }

    console.log('Successfully created booking owner and students:', {
      bookingOwner: bookingOwnerData,
      students: studentsData,
    });

    // Pass the enquirer details to the confirmation email function
    await sendEnquiryConfirmationEmail(enquirerDetails);

    // Notify the office
    await notifyOfficeEmail(enquirerDetails);

    // Respond with success
    return NextResponse.json({
      message: 'Enquiry processed and confirmation email sent successfully',
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
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
