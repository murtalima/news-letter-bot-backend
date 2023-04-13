import { Body, Controller, Param, Post } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { AddGuildUsersService } from "./addGuild.service";
import { AddGuildUserDto } from "./addGuild.dto";
import { User } from "src/shared/entities";

@Controller(RoutesNames.USERS)
export class AddGuildUsersController {
  constructor(private service: AddGuildUsersService) {}
  @Post('/:userId/guild')
  execute(@Body() dto: AddGuildUserDto, @Param('userId') userId: string): Promise<User> {
    return this.service.execute(dto, userId);
  }
}
