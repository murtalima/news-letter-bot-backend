import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UpdateGuildsController } from "src/modules/guilds/contexts/update/update.controller";
import { UpdateGuildsService } from "src/modules/guilds/contexts/update/update.service";
import { User } from "src/shared/entities";
import { UsersMockRepository } from "src/shared/mocks/users.mock";
import { UpdateUsersController } from "../update.controller";
import { UpdateUsersService } from "../update.service";

describe("Guild", () => {
  let updateUsersController: UpdateUsersController;
  let updateUsersService: UpdateUsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdateUsersController],
      providers: [
        UpdateUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UsersMockRepository,
        },
      ],
    }).compile();

    updateUsersService = moduleRef.get<UpdateUsersService>(UpdateUsersService);
    updateUsersController = moduleRef.get<UpdateUsersController>(
      UpdateUsersController
    );
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(updateUsersService).toBeDefined();
      expect(updateUsersController).toBeDefined();
    });
  });
});
