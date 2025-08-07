//Enquiry Data Structure
export type BookingOwner = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  postcode: string;
  geopoint?: { lat: number; lng: number } | null;
  ward?: string;
  region?: string;
  city?: string;
  geopoint_consent?: boolean;
};

export type Student = {
  id: string;
  booking_owner_id: string;
  name: string;
  age: string;
  level: string;
  notes?: string;
  instruments: string[];
  is_booking_owner: boolean;
};

export type EnquiryNotification = {
  booking_owner: BookingOwner;
  students: Student[];
};
