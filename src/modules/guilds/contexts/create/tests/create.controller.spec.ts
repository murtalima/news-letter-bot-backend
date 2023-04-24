import { Test } from "@nestjs/testing";
import { CreateGuildsController } from "../create.controller";
import { CreateGuildsService } from "../create.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import {
  GuildsMockRepository,
  guildMockDb,
} from "src/shared/mocks/guilds.mock";
import { faker } from "@faker-js/faker";
import { BadRequestException } from "@nestjs/common";
import { alreadyExist } from "src/config/errorsMessages";

describe("Guild", () => {
  let createGuildsController: CreateGuildsController;
  let createGuildService: CreateGuildsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateGuildsController],
      providers: [
        CreateGuildsService,
        {
          provide: getRepositoryToken(Guild),
          useFactory: GuildsMockRepository,
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

    it("should throw a guild already created", async () => {
      const existentGuild = guildMockDb[0];

      const dto = {
        discordId: existentGuild.discordId,
        membersCount: existentGuild.membersCount,
        name: existentGuild.name,
      };

      await expect(createGuildsController.execute(dto)).rejects.toThrow(
        new BadRequestException(alreadyExist("guild"))
      );
    });

    it("should create a guild successfully", async () => {
      const discordId = faker.random.numeric(faker.datatype.number(100));
      const membersCount = faker.random.numeric(faker.datatype.number(10));
      const name = faker.random.alphaNumeric(faker.datatype.number(100));

      const dto = {
        discordId,
        membersCount: parseInt(membersCount),
        name,
      };

      await expect(createGuildsController.execute(dto)).resolves.toEqual(
        expect.objectContaining({
          id: 4,
          discordId: dto.discordId,
          membersCount: dto.membersCount,
          name: dto.name,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });
  });
});
