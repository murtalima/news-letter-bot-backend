import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { FindGuildsService } from "./find.service";
import { Guild } from "src/shared/entities";
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags(Tags.GUILDS)
@Controller(RoutesNames.GUILDS)
export class FindGuildsController {
  constructor(private service: FindGuildsService) {}

  @ApiOperation({ description: "Find a Guild" })
  @ApiBadRequestResponse({ description: "Guild not found" })
  @ApiOkResponse({ description: "Guild found successfully", type: Guild })
  @HttpCode(HttpStatus.OK)
  @Get("/:discordId")
  execute(@Param("discordId") discordId: string): Promise<Guild> {
    return this.service.execute(discordId);
  }
}
