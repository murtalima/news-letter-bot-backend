import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { FindGuildsController } from "../find.controller";
import { FindGuildsService } from "../find.service";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";

describe("Guild", () => {
  let findGuildsController: FindGuildsController;
  let findGuildsService: FindGuildsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FindGuildsController],
      providers: [
        FindGuildsService,
        {
          provide: getRepositoryToken(Guild),
          useValue: GuildsMockRepository,
        },
      ],
    }).compile();

    findGuildsService = moduleRef.get<FindGuildsService>(FindGuildsService);
    findGuildsController =
      moduleRef.get<FindGuildsController>(FindGuildsController);
  });

  describe("Find", () => {
    it("should be defined", async () => {
      expect(findGuildsService).toBeDefined();
      expect(findGuildsController).toBeDefined();
    });
  });
});
