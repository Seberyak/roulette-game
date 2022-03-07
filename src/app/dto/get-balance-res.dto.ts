import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceResDto {
  @ApiProperty({ type: Number })
  balance: number;
}
