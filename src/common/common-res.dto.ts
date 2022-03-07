import { ApiProperty } from '@nestjs/swagger';

export class CommonResDto<T = any> {
  @ApiProperty({ type: 'boolean' })
  success: boolean;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ required: false })
  data?: T;
}
