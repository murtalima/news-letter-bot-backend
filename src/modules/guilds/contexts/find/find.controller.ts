import { Controller, Get, Param } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { FindGuildsService } from "./find.service";
import { Guild } from "src/shared/entities";

@Controller(RoutesNames.GUILDS)
export class FindGuildsController {
  constructor(private service: FindGuildsService) {}
  @Get("/:discordId")
  execute(@Param("discordId") discordId: string): Promise<Guild> {
    return this.service.execute(discordId);
  }
}
