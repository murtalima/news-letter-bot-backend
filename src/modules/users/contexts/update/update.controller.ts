import { Body, Controller, HttpCode, HttpStatus, Param, Put } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { UpdateUsersService } from "./update.service";
import { User } from "src/shared/entities";
import { UpdateUserDto } from "./update.dto";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateUserResponseDto } from "../create/create.dto";

@ApiTags(Tags.USERS)
@Controller(RoutesNames.USERS)
export class UpdateUsersController {
  constructor(private service: UpdateUsersService) {}

  @ApiOperation({ description: 'Update a user'})
  @ApiNotFoundResponse({ description: 'User not found'})
  @ApiOkResponse({ description: 'User updated successfully', type: CreateUserResponseDto})
  @ApiParam({ name: 'discordId', example: '360209386682974208'})
  @HttpCode(HttpStatus.OK)
  @Put("/:discordId")
  execute(@Body() dto: UpdateUserDto, @Param('discordId') discordId: string): Promise<User> {
    return this.service.execute(dto, discordId);
  }
}
