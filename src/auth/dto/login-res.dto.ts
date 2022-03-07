import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ type: String })
  access_token: string;
}
