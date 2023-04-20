import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateNewspaperController } from "./contexts/create/create.controller";
import { CreateNewspaperService } from "./contexts/create/create.service";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { User, Visualization } from "src/shared/entities";
import { GetNewspaperByUserController } from "./contexts/getByUser/getByUser.controller";
import { GetNewspaperByUserService } from "./contexts/getByUser/getByUser.service";
import { FindNewspaperController } from "./contexts/find/find.controller";
import { FindNewspaperService } from "./contexts/find/find.service";
import { GradeNewspaperController } from "./contexts/grade/grade.controller";
import { GradeNewspaperService } from "./contexts/grade/grade.service";

@Module({
  imports: [TypeOrmModule.forFeature([Newspaper, User, Visualization])],
  controllers: [
    CreateNewspaperController,
    GetNewspaperByUserController,
    FindNewspaperController,
    GradeNewspaperController,
  ],
  providers: [
    CreateNewspaperService,
    GetNewspaperByUserService,
    FindNewspaperService,
    GradeNewspaperService,
  ],
})
export class NewspaperModule {}
