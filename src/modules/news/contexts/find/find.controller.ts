import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { FindNewspaperService } from "./find.service";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Newspaper } from "src/shared/entities";

@ApiTags(Tags.NEWSPAPER)
@Controller(RoutesNames.NEWSPAPER)
export class FindNewspaperController {
  constructor(private service: FindNewspaperService) {}

  @ApiOperation({ description: "Find a Newspaper" })
  @ApiNotFoundResponse({ description: "Newspaper not found" })
  @ApiOkResponse({ description: "Newspaper found", type: Newspaper })
  @ApiParam({ name: "newspaperId", example: "324" })
  @HttpCode(HttpStatus.OK)
  @Get("/:newspaperId")
  execute(@Param("newspaperId") newspaperId: number) {
    return this.service.execute(newspaperId);
  }
}
