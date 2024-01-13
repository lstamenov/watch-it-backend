import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default UserDto;
