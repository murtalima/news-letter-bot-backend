import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUsersController } from "../../create/create.controller";
import { CreateUsersService } from "../../create/create.service";
import { Guild, User } from "src/shared/entities";
import { UsersMockRepository } from "src/shared/mocks/users.mock";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";

describe("Guild", () => {
  let createUsersController: CreateUsersController;
  let createUsersService: CreateUsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateUsersController],
      providers: [
        CreateUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UsersMockRepository,
        },
        {
          provide: getRepositoryToken(Guild),
          useValue: GuildsMockRepository,
        },
      ],
    }).compile();

    createUsersService = moduleRef.get<CreateUsersService>(CreateUsersService);
    createUsersController = moduleRef.get<CreateUsersController>(
      CreateUsersController
    );
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(createUsersService).toBeDefined();
      expect(createUsersController).toBeDefined();
    });
  });
});
