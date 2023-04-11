import { Controller, Get, Param } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { FindUsersService } from "./find.service";
import { User } from "src/shared/entities";

@Controller(RoutesNames.USERS)
export class FindUsersController {
  constructor(private service: FindUsersService) {}
  @Get("/:discordId")
  execute(@Param("discordId") discordId: string): Promise<User> {
    return this.service.execute(discordId);
  }
}
