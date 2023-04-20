import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateGuildsService } from "./create.service";
import { CreateGuildDto } from "./create.dto";
import { Guild } from "src/shared/entities";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { RoutesNames, Tags } from "src/config";

@ApiTags(Tags.GUILDS)
@Controller(RoutesNames.GUILDS)
export class CreateGuildsController {
  constructor(private service: CreateGuildsService) {}

  @ApiOperation({ description: "Create a Guild" })
  @ApiBadRequestResponse({ description: "Guild already registered" })
  @ApiCreatedResponse({
    description: "Guild created successfully",
    type: Guild,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  execute(@Body() dto: CreateGuildDto): Promise<Guild> {
    return this.service.execute(dto);
  }
}
