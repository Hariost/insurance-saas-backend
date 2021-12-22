import { IsNotEmpty, IsNumber, } from 'class-validator';

export class CreateBrancheDto {
    @IsNumber()
    id?: string;

    @IsNotEmpty()
    libelle: string;
}
