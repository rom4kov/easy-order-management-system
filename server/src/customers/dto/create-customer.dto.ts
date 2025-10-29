export class CreateCustomerDto {
  name: string;
  contactName: string;
  phone: number;
  email: string;
  street: string;
  city: string;
  zipcode: number;
  industry: string;
  type: string;
  orders?: string;
  invoices?: string;
  firstOrderDate: Date;
  status: string;
}
