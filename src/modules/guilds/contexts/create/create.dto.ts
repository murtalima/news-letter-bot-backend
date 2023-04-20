import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGuildDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: 'Discord do Gabriel' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '759735507810254858' })
  @IsNotEmpty()
  @IsString()
  discordId: string;

  @ApiProperty({ type: Number, required: false, nullable: true, example: 12 })
  @IsOptional()
  @IsNumber()
  membersCount: number;
}
