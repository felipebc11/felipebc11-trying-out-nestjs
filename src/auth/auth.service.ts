import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  readonly validateUser = async (username: string, pass: string): Promise<any> =>{
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  readonly login = async (user: any): Promise<any> =>{
    const payload = { username: user.username, sub: user.userId };
    
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}