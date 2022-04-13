import { IsNotEmpty, IsEmail, IsEnum,IsOptional } from 'class-validator';
import { AuthMethod } from '../enum/auth-method.enum';
import {ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {  
    @IsNotEmpty()  
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()  
    @ApiProperty()
    firstName: string;

    @IsOptional()
    @ApiProperty()
    phoneNumber: string;

    @IsOptional()  
    @IsEmail()  
    @ApiProperty()
    email: string;
    
    @IsNotEmpty()  
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsEnum(AuthMethod)
    @ApiProperty()
    authMethod: AuthMethod;
   
}