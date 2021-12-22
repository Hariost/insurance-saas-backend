import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entity/produit.entity';
import { BrancheService } from './branches.service'

@Injectable()
export class ProduitsService {
  
  constructor(
    @InjectRepository(Produit) private produitsRepository: Repository<Produit>,
    private readonly brancheService: BrancheService
  ){

  }

  create(createProduitDto: CreateProduitDto) {
    return this.produitsRepository.create(createProduitDto);
  }

  findAll() {
    return this.produitsRepository.find();
  }

  async findOne(id: number) {
    const produit = await this.produitsRepository.findOne(id);
    if (produit) {
      return produit;
    }

    throw new HttpException('Produit non retrouvé', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    await this.produitsRepository.update(id, updateProduitDto);
    const updatedProduit = await this.produitsRepository.findOne(id);
    if (updatedProduit) {
      return updatedProduit;
    }

    throw new HttpException('Produit non retrouvé.', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return `This action removes a #${id} produit`;
  }
}
