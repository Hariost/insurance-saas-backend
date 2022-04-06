import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './entities/user.entity'
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto } from '../shared/mapper'
import { comparePasswords } from '../shared/util'
import { LoginUserDto } from './dto/login.user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)    
        private readonly usersRepository: Repository<UserEntity> ) {}
    
    async _uploadPublicFile(dataBuffer: Buffer, filename: string) {
        // implement file upload
        return `${uuid()}-${filename}`;
    }

    async findOne(options?: object): Promise<UserEntity> {
        const user =  await this.usersRepository.findOne(options);    
        return user 
    }
    async getByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            return user; 
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
    
    async getByIds(ids: number[]) {
        return this.usersRepository.find({
            where: { id: In(ids) },
        });
    }
    
    async getById(id: string) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;  
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async handleLocalAuth({ email, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.usersRepository.findOne({ where: { email } });
        
        if (!user) {
            throw new HttpException('Identifiants incorrects.', HttpStatus.UNAUTHORIZED);    
        }
        
        const isPasswordMatching = await comparePasswords(user.password, password);
        
        if (!isPasswordMatching) {
            throw new HttpException('Identifiants incorrects.', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }

    async findByPayload({ userId }: any): Promise<UserEntity> {
        return await this.findOne({ 
            where:  { id: userId } });  
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { lastName, firstName, phoneNumber, email, password, } = userDto;
        
        const userInDb = await this.usersRepository.findOne({ 
            where: { email } 
        });
        if (userInDb) {
            throw new HttpException('Un utilisateur aec cet email existe déjà.', HttpStatus.BAD_REQUEST);    
        }
        const user: UserEntity = await this.usersRepository.create({ lastName, firstName, phoneNumber, email, password, });
        await this.usersRepository.save(user);
        return toUserDto(user);  
    }
    
    async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
        const user = await this.getById(userId);
        if (user.avatar) {
          await this.usersRepository.update(userId, {
            ...user,
            avatar: null
          });
        }
        return user;
    }
    
    async deleteAvatar(userId: string) {

    }
    
    async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
        currentHashedRefreshToken
    });
    }
    
    async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
        const user = await this.getById(userId);
    
        const isRefreshTokenMatching = await bcrypt.compare(
          refreshToken,
          user.currentHashedRefreshToken
        );
    
        if (isRefreshTokenMatching) {
          return user;
        }
    }
    
    async markEmailAsConfirmed(email: string) {
        return this.usersRepository.update({ email }, {
          isEmailConfirmed: true
        });
    }
    
    markPhoneNumberAsConfirmed(userId: string) {
        return this.usersRepository.update({ id: userId }, {
          isPhoneNumberConfirmed: true
        });
    }
    
    async removeRefreshToken(userId: number) {
        return this.usersRepository.update(userId, {
          currentHashedRefreshToken: null
        });
    }
    
    async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
        return this.usersRepository.update(userId, {
          twoFactorAuthenticationSecret: secret
        });
    }
    
    async turnOnTwoFactorAuthentication(userId: number) {
        return this.usersRepository.update(userId, {
          isTwoFactorAuthenticationEnabled: true
        });
    }
}
