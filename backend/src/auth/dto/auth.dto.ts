import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadDTO {
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
