import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto.ts/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByemail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    /*  console.log(user);
    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    } */
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.findUserByemail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = new this.userModel(newUser);
    delete user.password;
    return user.save();
  }
}
