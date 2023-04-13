import { Controller, Get, Param } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { GetNewspaperByUserService } from "./getByUser.service";

@Controller(RoutesNames.NEWSPAPER)
export class GetNewspaperByUserController {
  constructor(private service: GetNewspaperByUserService) {}
  @Get('/user/:userId')
  execute(@Param('userId') userId: string) {
    return this.service.execute(userId);
  }
}
