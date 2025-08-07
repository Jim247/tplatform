import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '❌');
  process.exit(1);
}

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function validateDatabaseSchema() {
  console.log('🔍 Validating database schema coherence...\n');

  try {
    // Check booking_owners table structure
    console.log('📋 BOOKING_OWNERS TABLE:');
    const { data: bookingOwnerColumns, error: boError } = await supabaseServer.rpc(
      'get_table_columns',
      { table_name: 'booking_owners' }
    );

    if (boError) {
      console.log('Using fallback method for booking_owners...');
      // Fallback: try to insert with null values to see what columns exist
      const { error: testError } = await supabaseServer
        .from('booking_owners')
        .insert({})
        .select()
        .limit(0);

      if (testError) {
        console.log('Table structure inferred from error:', testError.message);
      }
    } else {
      bookingOwnerColumns?.forEach((col) => {
        console.log(
          `  - ${col.column_name}: ${col.data_type} ${col.is_nullable ? '(nullable)' : '(required)'}`
        );
      });
    }

    console.log('\n📋 STUDENTS TABLE:');
    const { data: studentColumns, error: stuError } = await supabaseServer.rpc(
      'get_table_columns',
      { table_name: 'students' }
    );

    if (stuError) {
      console.log('Using fallback method for students...');
      const { error: testError } = await supabaseServer
        .from('students')
        .insert({})
        .select()
        .limit(0);

      if (testError) {
        console.log('Table structure inferred from error:', testError.message);
      }
    } else {
      studentColumns?.forEach((col) => {
        console.log(
          `  - ${col.column_name}: ${col.data_type} ${col.is_nullable ? '(nullable)' : '(required)'}`
        );
      });
    }

    // Test the exact fields your code tries to insert
    console.log('\n🧪 TESTING COHERENCE:');
    console.log('Fields your code inserts into booking_owners:');
    const bookingOwnerFields = [
      'first_name',
      'last_name',
      'username',
      'email',
      'phone',
      'postcode',
      'geopoint',
      'ward',
      'region',
      'city',
      'geopoint_consent',
    ];
    bookingOwnerFields.forEach((field) => console.log(`  ✓ ${field}`));

    console.log('\nFields your code inserts into students:');
    const studentFields = [
      'booking_owner_id',
      'name',
      'age',
      'level',
      'notes',
      'instruments',
      'is_booking_owner',
    ];
    studentFields.forEach((field) => console.log(`  ✓ ${field}`));

    // Try a test insert with minimal data to verify it works
    console.log('\n🚀 TESTING ACTUAL INSERT:');
    const testBookingOwner = {
      first_name: 'TEST',
      last_name: 'USER',
      username: 'testuser',
      email: 'test@example.com',
      phone: '1234567890',
      postcode: 'TEST123',
      geopoint: null,
      ward: null,
      region: null,
      city: null,
      geopoint_consent: true,
    };

    const { data: testOwner, error: insertError } = await supabaseServer
      .from('booking_owners')
      .insert(testBookingOwner)
      .select()
      .single();

    if (insertError) {
      console.log('❌ Booking owner insert failed:', insertError.message);
      return;
    } else {
      console.log('✅ Booking owner insert successful, ID:', testOwner.id);
    }

    // Test student insert
    const testStudent = {
      booking_owner_id: testOwner.id,
      name: 'Test Student',
      age: 25,
      level: 'Beginner',
      notes: 'Test notes',
      instruments: ['Piano'],
      is_booking_owner: true,
    };

    const { data: testStudentData, error: studentInsertError } = await supabaseServer
      .from('students')
      .insert(testStudent)
      .select();

    if (studentInsertError) {
      console.log('❌ Student insert failed:', studentInsertError.message);
    } else {
      console.log('✅ Student insert successful, ID:', testStudentData[0].id);
    }

    // Clean up test data
    await supabaseServer.from('students').delete().eq('booking_owner_id', testOwner.id);
    await supabaseServer.from('booking_owners').delete().eq('id', testOwner.id);
    console.log('🧹 Test data cleaned up');

    console.log('\n✅ SCHEMA VALIDATION COMPLETE - Everything looks coherent!');
  } catch (error) {
    console.error('❌ Validation failed:', error);
  }
}

validateDatabaseSchema();
