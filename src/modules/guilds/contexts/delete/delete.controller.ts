import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { RoutesNames } from "src/config";
import { DeleteGuildsService } from "./delete.service";

@Controller(RoutesNames.GUILDS)
export class DeleteGuildsController {
  constructor(private service: DeleteGuildsService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:discordId")
  async execute(@Param("discordId") discordId: string): Promise<void> {
    await this.service.execute(discordId);
  }
}
