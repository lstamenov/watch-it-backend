import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

class UpdateUserAvatar {
  @IsString()
  @IsNotEmpty()
  avatarURL: string;
}

class UpdateUserPassword {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

class UpdateFavourites {
  @IsNumber()
  id: number;
}

export { UpdateUserAvatar, UpdateUserPassword, UpdateFavourites };

export default UserDto;
