export type User = {
  id: number;
  username: string;
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

export type UserAuth = {
  exp: number,
  iat: number,
  sub: number,
  username: string,
}
