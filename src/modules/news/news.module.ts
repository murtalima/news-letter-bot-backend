import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateNewspaperController } from "./contexts/create/create.controller";
import { CreateNewspaperService } from "./contexts/create/create.service";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { User, Visualization } from "src/shared/entities";
import { GetNewspaperByUserController } from "./contexts/getByUser/getByUser.controller";
import { GetNewspaperByUserService } from "./contexts/getByUser/getByUser.service";

@Module({
  imports: [TypeOrmModule.forFeature([Newspaper, User, Visualization])],
  controllers: [
    CreateNewspaperController,
    GetNewspaperByUserController
  ],
  providers: [
    CreateNewspaperService,
    GetNewspaperByUserService
  ],
})

export class NewspaperModule {}
