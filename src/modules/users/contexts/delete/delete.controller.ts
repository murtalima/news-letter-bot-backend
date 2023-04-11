import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { RoutesNames } from "src/config";
import { DeleteUsersService } from "./delete.service";

@Controller(RoutesNames.USERS)
export class DeleteUsersController {
  constructor(private service: DeleteUsersService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:discordId")
  async execute(@Param("discordId") discordId: string): Promise<void> {
    await this.service.execute(discordId);
  }
}
