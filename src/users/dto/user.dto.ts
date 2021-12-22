import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  lastName: string;
    @IsNotEmpty()  firstName: string;
    @IsNotEmpty()  @IsEmail()  email: string;
    isRegisteredWithGoogle? : boolean;
    avatar?: string;
}