import { Body, Controller, Put } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { UpdateUsersService } from "./update.service";
import { User } from "src/shared/entities";
import { UpdateUserDto } from "./update.dto";

@Controller(RoutesNames.USERS)
export class UpdateUsersController {
  constructor(private service: UpdateUsersService) {}
  @Put("/:discordId")
  execute(@Body() dto: UpdateUserDto): Promise<User> {
    return this.service.execute(dto);
  }
}
