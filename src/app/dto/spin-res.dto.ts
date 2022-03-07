import { ApiProperty } from '@nestjs/swagger';

export class SpinResDto {
  @ApiProperty({ type: Number })
  public winNumber: number;

  @ApiProperty({ type: Number })
  public winAmount: number;

  @ApiProperty({ type: Number })
  public balance: number;
}
