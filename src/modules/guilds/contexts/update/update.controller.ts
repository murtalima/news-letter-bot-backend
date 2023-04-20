import { Body, Controller, HttpCode, HttpStatus, Put } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { UpdateGuildsService } from "./update.service";
import { Guild } from "src/shared/entities";
import { UpdateGuildDto } from "./update.dto";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags(Tags.GUILDS)
@Controller(RoutesNames.GUILDS)
export class UpdateGuildsController {
  constructor(private service: UpdateGuildsService) {}

  @ApiOperation({ description: 'Update a Guild' })
  @ApiNotFoundResponse({ description: 'Guild not found' })
  @ApiOkResponse({ description: 'Guild updated successfully' })
  @HttpCode(HttpStatus.OK)
  @Put("/:discordId")
  execute(@Body() dto: UpdateGuildDto): Promise<Guild> {
    return this.service.execute(dto);
  }
}
