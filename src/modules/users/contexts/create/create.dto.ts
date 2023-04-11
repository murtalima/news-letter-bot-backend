import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  discordId: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdm: boolean;

  @IsBoolean()
  @IsOptional()
  isMuted: boolean;

  @IsNotEmpty()
  @IsString()
  guildId: string;
}
