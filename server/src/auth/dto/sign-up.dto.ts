export class SignUpDto {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: number;
  website: string;
  companyName: string;
  street: string;
  zipcode: number;
  city: string;
  createdAt: Date;
  details?: string;
}
