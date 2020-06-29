import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }

  async signByPayload(payload: any) {
    return sign(payload, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_TOKEN,
    });
  }
}
