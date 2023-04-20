import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { GradeNewspaperService } from "./grade.service";
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Newspaper } from "src/shared/entities";

@ApiTags(Tags.NEWSPAPER)
@Controller(RoutesNames.NEWSPAPER)
export class GradeNewspaperController {
  constructor(private service: GradeNewspaperService) {}

  @ApiOperation({ description: "Like or Dislike a Newspaper" })
  @ApiNotFoundResponse({ description: "Newspaper or User not found" })
  @ApiOkResponse({ description: "Newspaper rated", type: Newspaper })
  @ApiBadRequestResponse({ description: "grade should be Like or Dislike" })
  @ApiParam({ name: "newspaperId", example: "324" })
  @ApiParam({ name: "userId", example: "360209386682974208" })
  @ApiQuery({ type: String, required: true, name: "grade", example: "Like" })
  @HttpCode(HttpStatus.OK)
  @Post("/:newspaperId/user/:userId")
  execute(
    @Param("newspaperId") newspaperId: number,
    @Param("userId") userId: string,
    @Query("grade") grade: string
  ) {
    return this.service.execute(newspaperId, userId, grade);
  }
}
