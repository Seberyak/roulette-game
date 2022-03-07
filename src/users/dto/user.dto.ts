import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class UserDto extends User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNumber({}, { message: 'Balance must be a positive number' })
  @IsPositive()
  @ApiProperty({ type: Number })
  balance: number;
}
