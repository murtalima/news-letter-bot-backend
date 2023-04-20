import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { DeleteGuildsController } from "../delete.controller";
import { DeleteGuildsService } from "../delete.service";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";

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
          useValue: GuildsMockRepository,
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
  });
});
