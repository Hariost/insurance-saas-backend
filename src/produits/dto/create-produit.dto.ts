import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateProduitDto {
    @IsNotEmpty()
    codeproduit: string;

    @IsNotEmpty()
    libelle: string;
    
    @IsNotEmpty()
    @IsNumber()
    primeMin: number;

    @IsNotEmpty()
    primeMax: number;

    @IsNotEmpty()
    ageMin: number;

    @IsNotEmpty()
    ageMax: number;

    ageSortie: number;

    @IsNotEmpty()
    brancheId: number;

    @IsBoolean()
    rachatPartielAutorise?: boolean;

    @IsNumber()
    tempsAvantRachat?: number;

    @IsNumber()
    pourcentageRachat?: number;

    @IsNumber()
    coutPolice?: number;
    
    @IsNumber()
    dureeRente?: number;

    @IsNotEmpty()
    formatNumProposition?: string;

    @IsNotEmpty()
    prefixeNumProposition: string;

    @IsBoolean()
    estCommercialise: boolean;

    @IsNotEmpty()
    codeStatutContrat: string;

    canalDistribution?: string;
}
