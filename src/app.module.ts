import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import ENTITIES from "./shared/entities";
import { GuildsModule } from "./modules/guilds/guilds.module";
import { NewspaperModule } from "./modules/news/news.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: ENTITIES,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    GuildsModule,
    NewspaperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
