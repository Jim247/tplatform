//Enquiry Owner 
export type EnquiryNotification = {
  id: string;
  email: string;
  phone?: string;
  first_name: string;
  last_name: string;
  username: string;
  instruments?: string[];
  //Students, if enquiring on students behalf 
  students?: {
    name: string;
    age: string;
    level: string;
    notes?: string;
    instruments: string[];
  }[]; // Include student details if submitting on behalf
};