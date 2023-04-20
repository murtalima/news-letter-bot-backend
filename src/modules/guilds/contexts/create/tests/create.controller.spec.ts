import { Test } from "@nestjs/testing";
import { CreateGuildsController } from "../create.controller";
import { CreateGuildsService } from "../create.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";

describe("Guild", () => {
  let createGuildsController: CreateGuildsController;
  let createGuildService: CreateGuildsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateGuildsController],
      providers: [
        CreateGuildsService,
        {
          provide: getRepositoryToken(Guild),
          useValue: GuildsMockRepository,
        },
      ],
    }).compile();

    createGuildService =
      moduleRef.get<CreateGuildsService>(CreateGuildsService);
    createGuildsController = moduleRef.get<CreateGuildsController>(
      CreateGuildsController
    );
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(createGuildService).toBeDefined();
      expect(createGuildsController).toBeDefined();
    });
  });
});
