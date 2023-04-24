import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/shared/entities";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import { FindUsersController } from "../find.controller";
import { FindUsersService } from "../find.service";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

describe("Guild", () => {
  let findUsersController: FindUsersController;
  let findUsersService: FindUsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FindUsersController],
      providers: [
        FindUsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: UsersMockRepository,
        },
      ],
    }).compile();

    findUsersService = moduleRef.get<FindUsersService>(FindUsersService);
    findUsersController =
      moduleRef.get<FindUsersController>(FindUsersController);
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(findUsersService).toBeDefined();
      expect(findUsersController).toBeDefined();
    });

    it("should find a user successfully", async () => {
      await expect(
        findUsersController.execute(usersMockDb[0].discordId)
      ).resolves.toBe(usersMockDb[0]);
    });

    it("should throw a user not found", async () => {
      await expect(
        findUsersController.execute(faker.random.numeric(100))
      ).rejects.toThrow(new NotFoundException(notFound("user")));
    });
  });
});
