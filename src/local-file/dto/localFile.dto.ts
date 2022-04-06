import { IsNotEmpty } from 'class-validator';

export class LocalFileDto {
    @IsNotEmpty()
    filename: string;
    @IsNotEmpty()
    path: string;
    @IsNotEmpty()
    mimetype: string;
    ownerId?: string;
}
export default LocalFileDto;