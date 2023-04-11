import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { CreateGuildsController } from "./contexts/create/create.controller";
import { CreateGuildsService } from "./contexts/create/create.service";
import { DeleteGuildsController } from "./contexts/delete/delete.controller";
import { DeleteGuildsService } from "./contexts/delete/delete.service";
import { FindGuildsController } from "./contexts/find/find.controller";
import { FindGuildsService } from "./contexts/find/find.service";
import { UpdateGuildsService } from "./contexts/update/update.service";
import { UpdateGuildsController } from "./contexts/update/update.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Guild])],
  controllers: [
    CreateGuildsController,
    DeleteGuildsController,
    FindGuildsController,
    UpdateGuildsController,
  ],
  providers: [
    CreateGuildsService,
    DeleteGuildsService,
    FindGuildsService,
    UpdateGuildsService,
  ],
})
export class GuildsModule {}
