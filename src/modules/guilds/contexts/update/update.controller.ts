import { Body, Controller, Put } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { UpdateGuildsService } from "./update.service";
import { Guild } from "src/shared/entities";
import { UpdateGuildDto } from "./update.dto";

@Controller(RoutesNames.GUILDS)
export class UpdateGuildsController {
  constructor(private service: UpdateGuildsService) {}
  @Put("/:discordId")
  execute(@Body() dto: UpdateGuildDto): Promise<Guild> {
    return this.service.execute(dto);
  }
}
