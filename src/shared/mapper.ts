import { UserEntity } from '../users/entity/user.entity';
import { UserDto } from '../users/dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, lastName, firstName, email, } = data;
    let userDto: UserDto = { id, lastName, firstName, email, };
    return userDto;
};