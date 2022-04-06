import { IsNotEmpty, IsEmail, IsEnum,IsOptional } from 'class-validator';
import { AuthMethod } from '../enum/auth-method.enum';

export class CreateUserDto {  
    @IsNotEmpty()  
    lastName: string;

    @IsNotEmpty()  
    firstName: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()  
    @IsEmail()  
    email: string;
    
    @IsNotEmpty()  
    password: string;

    @IsNotEmpty()
    @IsEnum(AuthMethod)
    authMethod: AuthMethod;
   
}