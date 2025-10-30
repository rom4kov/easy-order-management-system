import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addUser(signUpDto: SignUpDto): Promise<InsertResult> {
    console.log(signUpDto);
    const result = await this.usersRepository.insert(signUpDto);
    console.log('user.service.ts result:', result);
    return result;
  }

  async findOne(username: string): Promise<User | null> {
    console.log('findOne called');
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
