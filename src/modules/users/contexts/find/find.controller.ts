import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { FindUsersService } from "./find.service";
import { User } from "src/shared/entities";
import { ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateUserResponseDto } from "../create/create.dto";

@ApiTags(Tags.USERS)
@Controller(RoutesNames.USERS)
export class FindUsersController {
  constructor(private service: FindUsersService) {}

  @ApiOperation({ description: 'find a user by discordId'})
  @ApiNotFoundResponse({ description: 'User not found'})
  @ApiOkResponse({ description: 'User found successfully', type: CreateUserResponseDto})
  @ApiParam({ name: 'discordId', example: '360209386682974208'})
  @HttpCode(HttpStatus.OK)
  @Get("/:discordId")
  execute(@Param("discordId") discordId: string): Promise<User> {
    return this.service.execute(discordId);
  }
}
