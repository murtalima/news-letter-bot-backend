import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { DeleteGuildsService } from "./delete.service";
import { ApiConsumes, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags(Tags.GUILDS)
@Controller(RoutesNames.GUILDS)
export class DeleteGuildsController {
  constructor(private service: DeleteGuildsService) {}

  @ApiOperation({ description: 'Delete a Guild' })
  @ApiNotFoundResponse({ description: 'Guild not Found' })
  @ApiNoContentResponse({ description: 'Guild deleted successfully' })
  @ApiParam({ name: 'discordId', type: String, example: '360209386682974208'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:discordId")
  async execute(@Param("discordId") discordId: string): Promise<void> {
    await this.service.execute(discordId);
  }
}
