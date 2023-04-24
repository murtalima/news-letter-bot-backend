import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { DeleteGuildsController } from "../delete.controller";
import { DeleteGuildsService } from "../delete.service";
import {
  GuildsMockRepository,
  guildMockDb,
} from "src/shared/mocks/guilds.mock";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

describe("Guild", () => {
  let deleteGuildsController: DeleteGuildsController;
  let deleteGuildsService: DeleteGuildsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DeleteGuildsController],
      providers: [
        DeleteGuildsService,
        {
          provide: getRepositoryToken(Guild),
          useFactory: GuildsMockRepository,
        },
      ],
    }).compile();

    deleteGuildsService =
      moduleRef.get<DeleteGuildsService>(DeleteGuildsService);
    deleteGuildsController = moduleRef.get<DeleteGuildsController>(
      DeleteGuildsController
    );
  });

  describe("Delete", () => {
    it("should be defined", async () => {
      expect(deleteGuildsService).toBeDefined();
      expect(deleteGuildsController).toBeDefined();
    });

    it("should delete a guild successfully", async () => {
      await expect(
        deleteGuildsController.execute(guildMockDb[0].discordId)
      ).resolves.toBe(undefined);
    });

    it("should throw a guild not found", async () => {
      await expect(
        deleteGuildsController.execute(faker.datatype.string(10))
      ).rejects.toThrow(new NotFoundException(notFound("user")));
    });
  });
});
