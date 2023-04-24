import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { UpdateGuildsController } from "../update.controller";
import { UpdateGuildsService } from "../update.service";
import {
  GuildsMockRepository,
  guildMockDb,
} from "src/shared/mocks/guilds.mock";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

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
          useFactory: GuildsMockRepository,
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

    it("should update a guild successfully", async () => {
      const discordId = guildMockDb[0].discordId;
      const membersCount = faker.random.numeric(faker.datatype.number(10));
      const name = faker.random.alphaNumeric(faker.datatype.number(100));

      const dto = {
        discordId,
        membersCount: parseInt(membersCount),
        name,
      };

      expect(updateGuildsController.execute(dto, discordId));
    });

    it("should throw a guild not found exception", async () => {
      const discordId = faker.random.numeric(faker.datatype.number(100));
      const membersCount = faker.random.numeric(faker.datatype.number(10));
      const name = faker.random.alphaNumeric(faker.datatype.number(100));

      const dto = {
        discordId,
        membersCount: parseInt(membersCount),
        name,
      };

      await expect(
        updateGuildsController.execute(dto, discordId)
      ).rejects.toThrow(new NotFoundException(notFound("guild")));
    });
  });
});
