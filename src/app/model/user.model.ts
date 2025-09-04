export interface User {
  userid?: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  country: string;
  phonenumber: string;
  afm: string;
  accepted: boolean;
  bidderRating?: number;
  sellerRating?: number;
}