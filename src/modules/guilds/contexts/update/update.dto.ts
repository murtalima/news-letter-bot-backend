import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGuildDto {
  @ApiProperty({ type: String, required: false, nullable: true, example: 'Discord do Gabriel' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false, nullable: true, example: '759735507810254858' })
  @IsOptional()
  @IsString()
  discordId: string;

  @ApiProperty({ type: Number, required: false, nullable: true, example: 12 })
  @IsOptional()
  @IsNumber()
  memberCount: number;
}
