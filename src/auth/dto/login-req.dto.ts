import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, default: 'admin', required: true })
  username: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, default: 'admin', required: true })
  password: string;
}
