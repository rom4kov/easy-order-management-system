export class SignUpDto {
  username: string = '';
  email: string = '';
  password: string = '';
  createdAt: Date = new Date();
  details?: string = '';
}
