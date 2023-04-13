import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddGuildUserDto {
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
