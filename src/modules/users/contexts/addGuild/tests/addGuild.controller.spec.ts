import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild, User } from "src/shared/entities";
import { GuildsMockRepository } from "src/shared/mocks/guilds.mock";
import { AddGuildUsersController } from "../addGuild.controller";
import { AddGuildUsersService } from "../addGuild.service";
import { UsersMockRepository } from "src/shared/mocks/users.mock";

describe("Guild", () => {
  let addGuildUsersController: AddGuildUsersController;
  let addGuildUsersService: AddGuildUsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AddGuildUsersController],
      providers: [
        AddGuildUsersService,
        {
          provide: getRepositoryToken(Guild),
          useValue: GuildsMockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: UsersMockRepository,
        },
      ],
    }).compile();

    addGuildUsersService =
      moduleRef.get<AddGuildUsersService>(AddGuildUsersService);
    addGuildUsersController = moduleRef.get<AddGuildUsersController>(
      AddGuildUsersController
    );
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(addGuildUsersService).toBeDefined();
      expect(addGuildUsersController).toBeDefined();
    });
  });
});
