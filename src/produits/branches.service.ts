import { Injectable } from '@nestjs/common';
import { CreateBrancheDto } from './dto/create-branche.dto';

@Injectable()
export class BrancheService {
  create(createBrancheDto: CreateBrancheDto) {
    return 'This action adds a new produit';
  }

  findAll() {
    return `This action returns all produits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produit`;
  }

}
