import { UserEntity } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/user.dto'

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, lastName, firstName, email, authMethod } = data;
    let userDto: UserDto = { id, lastName, firstName, email, authMethod};
    return userDto;
};