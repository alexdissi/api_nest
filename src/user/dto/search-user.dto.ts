import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SearchUsersDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string; 
}