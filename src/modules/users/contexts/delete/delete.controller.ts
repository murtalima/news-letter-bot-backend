import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { DeleteUsersService } from "./delete.service";
import {
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags(Tags.USERS)
@Controller(RoutesNames.USERS)
export class DeleteUsersController {
  constructor(private service: DeleteUsersService) {}

  @ApiOperation({ description: "Delete a user" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiNoContentResponse({ description: "User deleted successfully" })
  @ApiParam({ name: "discordId", example: "360209386682974208" })
  @ApiConsumes("multipart/form-data")
  @Delete("/:discordId")
  async execute(@Param("discordId") discordId: string): Promise<void> {
    await this.service.execute(discordId);
  }
}
