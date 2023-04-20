import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ type: String, required: false, nullable: true, example: 'Gabriel Lima' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, required: false, nullable: true, default: false })
  @IsOptional()
  @IsBoolean()
  isAdm?: boolean;

  @ApiProperty({ type: String, required: false, nullable: true, default: false })
  @IsOptional()
  @IsBoolean()
  isMuted?: boolean;
}
