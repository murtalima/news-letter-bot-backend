import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { AddGuildUsersService } from "./addGuild.service";
import { AddGuildUserDto } from "./addGuild.dto";
import { User } from "src/shared/entities";
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags(Tags.USERS)
@Controller(RoutesNames.USERS)
export class AddGuildUsersController {
  constructor(private service: AddGuildUsersService) {}
  
  @ApiOperation({ description: 'Associate a Guild to a User'})
  @ApiNotFoundResponse({ description: 'Guild or User not found'})
  @ApiNoContentResponse({ description: 'Guild associated to User successfully'})
  @ApiParam({ name: 'userId', example: '360209386682974208'})
  @Post('/:userId/guild')
  @HttpCode(HttpStatus.NO_CONTENT)
  execute(@Body() dto: AddGuildUserDto, @Param('userId') userId: string): Promise<User> {
    return this.service.execute(dto, userId);
  }
}
