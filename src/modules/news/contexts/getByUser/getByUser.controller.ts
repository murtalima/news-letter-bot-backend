import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { GetNewspaperByUserService } from "./getByUser.service";
import {
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Newspaper } from "src/shared/entities";

@ApiTags(Tags.NEWSPAPER)
@Controller(RoutesNames.NEWSPAPER)
export class GetNewspaperByUserController {
  constructor(private service: GetNewspaperByUserService) {}

  @ApiOperation({ description: "Find a Newspaper to a user" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiOkResponse({ description: "Newspaper found", type: Newspaper })
  @ApiParam({ name: "newspaperId", example: "324" })
  @HttpCode(HttpStatus.OK)
  @Get("/user/:userId")
  execute(@Param("userId") userId: string) {
    return this.service.execute(userId);
  }
}
