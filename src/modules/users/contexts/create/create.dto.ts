import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Guild } from "src/shared/entities";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: "Gabriel Lima",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: "360209386682974208",
  })
  @IsNotEmpty()
  @IsString()
  discordId: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    nullable: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isAdm: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    nullable: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isMuted: boolean;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: "668413162739204106",
  })
  @IsNotEmpty()
  @IsString()
  guildId: string;
}

export class CreateUserResponseDto {
  @ApiProperty({ type: String, example: "Gabriel Lima" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: "360209386682974208" })
  @IsNotEmpty()
  @IsString()
  discordId: string;

  @ApiProperty({ type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  isAdm: boolean;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsOptional()
  isMuted: boolean;

  @ApiProperty({ type: Guild, isArray: true })
  guilds: Guild[];
}
