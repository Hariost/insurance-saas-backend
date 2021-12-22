import {
    Injectable,HttpException, HttpStatus
  } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/reagistration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { UserDto } from '../users/dto/user.dto';
import { LoginUserDto } from '../users/dto/login.user.dto';
import { UsersService } from '../users/users.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService,
        private readonly configService: ConfigService){}
    
    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        
        try {
            const user = await this.usersService.create(userDto);
            let status: RegistrationStatus = {
                success: true,   
                message: 'Utilisateur crée.',
                user: user
            };
            return status
        } catch (err) {
            let status: RegistrationStatus = {
                success: false,   
                message: err,
                user: null
            };
            return status
        }
    }

    async localSignin(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        const user = await this.usersService.handleLocalAuth(loginUserDto);
        const token = this._createToken(user);
        
        return {
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            ...token,    
        };  
    }
    
    async oAuthSignin(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        const user = await this.usersService.handleLocalAuth(loginUserDto);
        const token = this._createToken(user);
        
        return {
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            ...token,    
        };  
    }
  
    private _createToken({ id }: UserDto): any {
        const user: JwtPayload = { userId: id };    
        const accessToken = this.jwtService.sign(user); 
        return {
            expiresIn: this.configService.get('EXPIRESIN'),
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);
        console.log('validateUser payload: ' + JSON.stringify(payload));  
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }

    public getCookieWithJwtToken(id: string) {
        const payload: JwtPayload = { userId: id };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieWithJwtAccessToken(userId: string, isSecondFactorAuthenticated = false) {
        const payload: JwtPayload = { userId, isSecondFactorAuthenticated };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
        });
        
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    }
    
    public getCookieWithJwtRefreshToken(userId: string) {
        const payload: JwtPayload = { userId };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '20h'
          // expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        });
        // const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=20h`;
        return {
          cookie,
          token
        }
    }
    
    public getCookiesForLogOut() {
        return [
          'Authentication=; HttpOnly; Path=/; Max-Age=0',
          'Refresh=; HttpOnly; Path=/; Max-Age=0'
        ];
    }

    public async getAuthenticatedUser(loginUserDto: LoginUserDto) {
        try {
          const user = await this.usersService.getByEmail(loginUserDto.email);
          await this.verifyPassword(loginUserDto.password, user.password);
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
    
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
    
    public async getUserFromAuthenticationToken(token: string) {
        const payload: JwtPayload = this.jwtService.verify(token, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
        });
        if (payload.userId) {
          return this.usersService.getById(payload.userId);
        }
      }
}
