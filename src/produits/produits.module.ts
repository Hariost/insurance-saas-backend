import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { BrancheService } from './branches.service'
import { ProduitsController } from './produits.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Produit } from './entity/produit.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([Produit]), 
    AuthModule,
    UsersModule
  ],
  controllers: [ProduitsController],
  providers: [ProduitsService, BrancheService]
})
export class ProduitsModule {}
