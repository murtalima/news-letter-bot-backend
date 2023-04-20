import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RoutesNames, Tags } from "src/config";
import { CreateNewsDto } from "./create.dto";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { CreateNewspaperService } from "./create.service";
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags(Tags.NEWSPAPER)
@Controller(RoutesNames.NEWSPAPER)
export class CreateNewspaperController {
  constructor(private service: CreateNewspaperService) {}

  @ApiOperation({ description: 'Create a newspaper' })
  @ApiBadRequestResponse({ description: 'newspaper already registered' })
  @ApiCreatedResponse({ description: 'Guild associated to User successfully', type: Newspaper })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  execute(@Body() dto: CreateNewsDto): Promise<Newspaper> {
    return this.service.execute(dto);
  }
}
