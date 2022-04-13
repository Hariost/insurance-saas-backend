import {
    Req,
    HttpCode,
    Controller, Post, Body, HttpException, HttpStatus
  }  from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { toUserDto } from '../shared/mapper';
import { RegistrationStatus } from './interfaces/reagistration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { Request, Response, Application } from 'express';
import RequestWithUser from './interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private readonly jwtService: JwtService,
         private readonly usersService: UsersService){}

    @Post('register')  
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {    
        const result: 
        RegistrationStatus = await this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
        }
        return result;  
    }

    @HttpCode(200)
    @Post('singin')
    async logIn(@Body() loginUserDto: LoginUserDto, @Req() request: Request) {
      const user = await this.authService.getAuthenticatedUser(loginUserDto)
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
      const {
        cookie: refreshTokenCookie,
        token: refreshToken
      } = this.authService.getCookieWithJwtRefreshToken(user.id);
      await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
      request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
      if (user.isTwoFactorAuthenticationEnabled) {
        return;
      }
  
      return toUserDto(user);
    }

}
