import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserEntity} from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/login.user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: string, password: string): Promise<UserEntity> {
    const loginUserDto : LoginUserDto = { email: email, password: password };
    return this.authenticationService.getAuthenticatedUser(loginUserDto);
  }
}