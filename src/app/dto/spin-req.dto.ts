import { BetInfo } from './bet-info';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SpinReqDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(37)
  @Type(() => BetInfo)
  @ApiProperty({
    type: BetInfo,
    isArray: true,
    default: [
      { betAmount: 15, betType: 0 },
      { betAmount: 1, betType: 'odd' },
    ],
  })
  betInfo: BetInfo[];
}
