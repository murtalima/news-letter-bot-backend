import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Guild, User } from "src/shared/entities";
import { GuildsMockRepository, guildMockDb } from "src/shared/mocks/guilds.mock";
import { AddGuildUsersController } from "../addGuild.controller";
import { AddGuildUsersService } from "../addGuild.service";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import { faker } from "@faker-js/faker";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { alreadyExist, notFound } from "src/config/errorsMessages";

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
          useFactory: GuildsMockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: UsersMockRepository,
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

    it("should add a guild to a user successfully", async () => {
      await expect(addGuildUsersController.execute({ guildId: guildMockDb[0].discordId }, usersMockDb[0].discordId)).resolves.toBe(undefined)
    });

    it("should throw a guild not found exception", async () => {
      await expect(addGuildUsersController.execute({ guildId: faker.random.alphaNumeric(100) }, usersMockDb[0].discordId)).rejects.toThrow(new NotFoundException(notFound('guild')))
    });

    it("should throw a user not found exception", async () => {
      await expect(addGuildUsersController.execute({ guildId: guildMockDb[0].discordId }, faker.random.alphaNumeric(100))).rejects.toThrow(new NotFoundException(notFound('user')))
    });

    it("should throw a guild already exists", async () => {
      usersMockDb[0].guilds.push(guildMockDb[0])
      await expect(addGuildUsersController.execute({ guildId: guildMockDb[0].discordId }, usersMockDb[0].discordId)).rejects.toThrow(new BadRequestException(alreadyExist('guild')))
    });
  });
});
