import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { AuthMethod } from '../enum/auth-method.enum';

export class UserDto {  
    @IsNotEmpty()  
    id: string;
    @IsNotEmpty()  
    lastName: string;
    @IsNotEmpty()  
    firstName: string;
    @IsOptional()  
    @IsEmail()  
    email: string;
    @IsNotEmpty() 
    authMethod: AuthMethod;
    @IsOptional() 
    phoneNumber?: string;
    isRegisteredWithGoogle? : boolean;
    avatar?: string;

}