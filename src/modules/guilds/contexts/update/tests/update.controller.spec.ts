import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { UpdateGuildsController } from "../update.controller";
import { UpdateGuildsService } from "../update.service";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";

describe("Guild", () => {
  let updateGuildsController: UpdateGuildsController;
  let updateGuildsService: UpdateGuildsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdateGuildsController],
      providers: [
        UpdateGuildsService,
        {
          provide: getRepositoryToken(Guild),
          useValue: GuildsMockRepository,
        },
      ],
    }).compile();

    updateGuildsService =
      moduleRef.get<UpdateGuildsService>(UpdateGuildsService);
    updateGuildsController = moduleRef.get<UpdateGuildsController>(
      UpdateGuildsController
    );
  });

  describe("Update", () => {
    it("should be defined", async () => {
      expect(updateGuildsService).toBeDefined();
      expect(updateGuildsController).toBeDefined();
    });
  });
});
