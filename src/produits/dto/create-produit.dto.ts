import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Branche } from '../entity/branches.entity';

export class CreateProduitDto {
    @IsNotEmpty()
    @ApiProperty()
    productCode: string;

    @IsNotEmpty()
    @ApiProperty()
    label: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    minPremium: number;

    @IsNotEmpty()
    @ApiProperty()
    maxPremium: number;

    @IsNotEmpty()
    @ApiProperty()
    minSubscriptionAge: number;

    @IsNotEmpty()
    @ApiProperty()
    maxSubscriptionAge: number;
    
    @ApiProperty()
    exitAge: number;

    @IsNotEmpty()
    @ApiProperty()
    branch: Branche;

    @IsBoolean()
    @ApiProperty()
    withdrawalAllowed?: boolean;

    @IsNumber()
    @ApiProperty()
    nbMonthBeforeWithdrawal?: number;

    @IsNumber()
    @ApiProperty()
    maxWithdrawalPercentage?: number;

    @IsNumber()
    @ApiProperty()
    policyFees?: number;
    
    @IsNumber()
    @ApiProperty()
    nbAnnuity?: number;

    @IsNotEmpty()
    @ApiProperty()
    policyNumberPattern?: string;

    @IsBoolean()
    isMarketed?: boolean;

    @IsNotEmpty()
    @ApiProperty()
    policyDefautStatus: string;

    @ApiProperty()
    distributionChannel?: string;
}
