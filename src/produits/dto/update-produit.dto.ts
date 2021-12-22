import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
   
}
