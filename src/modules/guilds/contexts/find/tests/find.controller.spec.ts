import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { FindGuildsController } from "../find.controller";
import { FindGuildsService } from "../find.service";
import {
  GuildsMockRepository,
  guildMockDb,
} from "src/shared/mocks/guilds.mock";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

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
          useFactory: GuildsMockRepository,
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

    it("should find a guild successfully", async () => {
      const user = guildMockDb[faker.datatype.number({ min: 0, max: 2 })];
      await expect(findGuildsController.execute(user.discordId)).resolves.toBe(
        user
      );
    });

    it("should find a guild successfully", async () => {
      await expect(
        findGuildsController.execute(faker.datatype.string(10))
      ).rejects.toThrow(new NotFoundException(notFound("guild")));
    });
  });
});
