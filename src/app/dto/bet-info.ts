import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';
import { ValidateBetType } from '../validators/bet-type.validator';

export class BetInfo {
  @Max(100, { message: 'Bet amount must be less than 100' })
  @Min(1, { message: 'Bet amount must be greater than 1' })
  @ApiProperty({ type: Number })
  betAmount: number;

  @ValidateBetType()
  @ApiProperty()
  betType: number | 'even' | 'odd';
}
