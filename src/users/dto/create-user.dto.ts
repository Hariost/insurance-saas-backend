import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {  
    @IsNotEmpty()  
    lastName: string;

    @IsNotEmpty()  
    firstName: string;

    phoneNumber: string;

    @IsNotEmpty()  
    @IsEmail()  
    email: string;
    
    @IsNotEmpty()  
    password: string;

   
}