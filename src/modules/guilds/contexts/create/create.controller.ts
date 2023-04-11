import { Body, Controller, Post } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { CreateGuildsService } from "./create.service";
import { CreateGuildDto } from "./create.dto";
import { Guild } from "src/shared/entities";

@Controller(RoutesNames.GUILDS)
export class CreateGuildsController {
  constructor(private service: CreateGuildsService) {}
  @Post()
  execute(@Body() dto: CreateGuildDto): Promise<Guild> {
    return this.service.execute(dto);
  }
}
