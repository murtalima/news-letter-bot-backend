import { Body, Controller, Post } from "@nestjs/common";
import { RoutesNames } from "src/config";
import { CreateNewsDto } from "./create.dto";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { CreateNewspaperService } from "./create.service";

@Controller(RoutesNames.NEWSPAPER)
export class CreateNewspaperController {
  constructor(private service: CreateNewspaperService) {}
  @Post()
  execute(@Body() dto: CreateNewsDto): Promise<Newspaper> {
    return this.service.execute(dto);
  }
}
