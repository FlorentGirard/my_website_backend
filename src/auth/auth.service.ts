import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto.ts/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);

    if (user) {
      const isValidatePassword = await bcrypt.compare(password, user.password);

      if (isValidatePassword) {
        return user;
      }
    }

    throw new UnauthorizedException('Email ou mot de passe invalid');
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };

    return {
      auth_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return { user };
  }
}
