import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ type: String, default: 'admin', required: true })
  username: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ type: String, default: 'admin', required: true })
  password: string;
}
