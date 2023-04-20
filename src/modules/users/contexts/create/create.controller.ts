import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { CreateUsersService } from "./create.service";
import { CreateUserDto, CreateUserResponseDto } from "./create.dto";
import { User } from "src/shared/entities";
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOperation, ApiTags, getSchemaPath } from "@nestjs/swagger";

@ApiTags(Tags.USERS)
@Controller(RoutesNames.USERS)
export class CreateUsersController {
  
  constructor(private service: CreateUsersService) {}

  @ApiOperation({ description: 'Create a user associated with one guild'})
  @ApiNotFoundResponse({ description: 'Guild not found'})
  @ApiCreatedResponse({ description: 'User created successfully', type: CreateUserResponseDto })
  @ApiBadRequestResponse({ description: 'User already exists'})
  @HttpCode(HttpStatus.CREATED)
  @Post()
  execute(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.execute(dto);
  }
}
