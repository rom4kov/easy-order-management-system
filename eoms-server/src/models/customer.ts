export interface Customer {
  id: string;
  name: string;
  contact_name: string;
  phone: number;
  email: string;
  address: {
    street: string;
    city: string;
    zip: number;
  };
  industry: string;
  type: string;
  orders: string[];
  invoices: string[];
  first_order_date: Date;
  status: string;
}
