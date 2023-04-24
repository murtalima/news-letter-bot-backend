import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/shared/entities";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import { UpdateUsersController } from "../update.controller";
import { UpdateUsersService } from "../update.service";
import { UpdateUserDto } from "../update.dto";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

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
          useFactory: UsersMockRepository,
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

    it("should update a user successfully", async () => {
      const dto: UpdateUserDto = {
        isAdm: faker.datatype.boolean(),
        isMuted: faker.datatype.boolean(),
        name: faker.random.words(5),
      };

      const user = usersMockDb[0];

      await expect(
        updateUsersController.execute(dto, user.discordId)
      ).resolves.toEqual({
        ...user,
        isAdm: dto.isAdm,
        isMuted: dto.isMuted,
        name: dto.name,
      });
    });

    it("should update a user successfully even without passing any optional attributes", async () => {
      const dto: UpdateUserDto = {};

      const user = usersMockDb[0];

      await expect(
        updateUsersController.execute(dto, user.discordId)
      ).resolves.toEqual(user);
    });
    it("should throw a user not found exception", async () => {
      const dto: UpdateUserDto = {
        isAdm: faker.datatype.boolean(),
        isMuted: faker.datatype.boolean(),
        name: faker.random.words(5),
      };

      await expect(
        updateUsersController.execute(dto, faker.random.numeric(100))
      ).rejects.toThrow(new NotFoundException(notFound("user")));
    });
  });
});
