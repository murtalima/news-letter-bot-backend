import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUsersController } from "../../create/create.controller";
import { CreateUsersService } from "../../create/create.service";
import { Guild, User } from "src/shared/entities";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import {
  GuildsMockRepository,
  guildMockDb,
} from "src/shared/mocks/guilds.mock";
import { CreateUserDto } from "../create.dto";
import { faker } from "@faker-js/faker";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { alreadyExist, notFound } from "src/config/errorsMessages";

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
          useFactory: UsersMockRepository,
        },
        {
          provide: getRepositoryToken(Guild),
          useFactory: GuildsMockRepository,
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

    it("should create a user successfully", async () => {
      const dto = {
        discordId: faker.random.numeric(faker.datatype.number(100)),
        guildId: guildMockDb[0].discordId,
        isAdm: faker.datatype.boolean(),
        isMuted: faker.datatype.boolean(),
        name: faker.random.words(5),
      } as CreateUserDto;

      await expect(createUsersController.execute(dto)).resolves.toEqual(
        expect.objectContaining({
          ...dto,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });

    it("should throw a user already exist", async () => {
      const user = usersMockDb[0];

      const dto = {
        discordId: user.discordId,
        guildId: guildMockDb[0].discordId,
        isAdm: user.isAdm,
        isMuted: user.isMuted,
        name: user.name,
      } as CreateUserDto;

      await expect(createUsersController.execute(dto)).rejects.toThrow(
        new BadRequestException(alreadyExist("user"))
      );
    });

    it("should throw a guild not found", async () => {
      const dto = {
        discordId: faker.random.numeric(faker.datatype.number(100)),
        guildId: faker.random.numeric(10),
        isAdm: faker.datatype.boolean(),
        isMuted: faker.datatype.boolean(),
        name: faker.random.words(5),
      } as CreateUserDto;

      await expect(createUsersController.execute(dto)).rejects.toThrow(
        new NotFoundException(notFound("guild"))
      );
    });
  });
});
