import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
  @ApiProperty({ type: String, required: true, nullable: true, example: 'Hoje aconteceu a criação do bot ...' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: String, required: true, nullable: true, example: 'Felipe' })
  @IsNotEmpty()
  @IsString()
  author: string;
}
