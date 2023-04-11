import { Body, Controller, Post } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { CreateUsersService } from "./create.service";
import { CreateUserDto } from "./create.dto";
import { User } from "src/shared/entities";

@Controller(RoutesNames.USERS)
export class CreateUsersController {
  constructor(private service: CreateUsersService) {}
  @Post()
  execute(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.execute(dto);
  }
}
