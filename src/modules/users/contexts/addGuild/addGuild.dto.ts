import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddGuildUserDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '668413162739204106' })
  @IsNotEmpty()
  @IsString()
  guildId: string;
}
