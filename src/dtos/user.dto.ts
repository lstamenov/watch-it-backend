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

class UpdateFavouriteShows {
  @IsNumber()
  showId: number;
}

export { UpdateUserAvatar, UpdateUserPassword, UpdateFavouriteShows };

export default UserDto;
