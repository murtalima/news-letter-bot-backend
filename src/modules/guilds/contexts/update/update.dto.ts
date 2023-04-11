import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGuildDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  discordId: string;

  @IsOptional()
  @IsNumber()
  memberCount: number;
}
