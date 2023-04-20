import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteGuildsController } from "src/modules/guilds/contexts/delete/delete.controller";
import { DeleteGuildsService } from "src/modules/guilds/contexts/delete/delete.service";
import { Guild, User } from "src/shared/entities";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";
import { UsersMockRepository } from "src/shared/mocks/users.mock";
import { DeleteUsersController } from "../delete.controller";
import { DeleteUsersService } from "../delete.service";

describe("Guild", () => {
  let deleteUsersController: DeleteUsersController;
  let deleteUsersService: DeleteUsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DeleteUsersController],
      providers: [
        DeleteUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UsersMockRepository,
        },
      ],
    }).compile();

    deleteUsersService = moduleRef.get<DeleteUsersService>(DeleteUsersService);
    deleteUsersController = moduleRef.get<DeleteUsersController>(
      DeleteUsersController
    );
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(deleteUsersService).toBeDefined();
      expect(deleteUsersController).toBeDefined();
    });
  });
});
