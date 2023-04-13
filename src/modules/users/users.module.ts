import { Module } from "@nestjs/common";
import { CreateUsersService } from "./contexts/create/create.service";
import { CreateUsersController } from "./contexts/create/create.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guild, User } from "src/shared/entities";
import { DeleteUsersController } from "./contexts/delete/delete.controller";
import { DeleteUsersService } from "./contexts/delete/delete.service";
import { FindUsersController } from "./contexts/find/find.controller";
import { FindUsersService } from "./contexts/find/find.service";
import { UpdateUsersController } from "./contexts/update/update.controller";
import { UpdateUsersService } from "./contexts/update/update.service";
import { AddGuildUsersController } from "./contexts/addGuild/addGuild.controller";
import { AddGuildUsersService } from "./contexts/addGuild/addGuild.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Guild])],
  controllers: [
    CreateUsersController,
    DeleteUsersController,
    FindUsersController,
    UpdateUsersController,
    AddGuildUsersController
  ],
  providers: [
    CreateUsersService,
    DeleteUsersService,
    FindUsersService,
    UpdateUsersService,
    AddGuildUsersService
  ],
})
export class UsersModule {}
