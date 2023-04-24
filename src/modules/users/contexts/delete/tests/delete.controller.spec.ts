import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/shared/entities";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import { DeleteUsersController } from "../delete.controller";
import { DeleteUsersService } from "../delete.service";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

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
          useFactory: UsersMockRepository,
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

    it("should delete a user successfully", async () => {
      await expect(
        deleteUsersController.execute(usersMockDb[0].discordId)
      ).resolves.toBe(undefined);
    });

    it("should throw a user not found exception", async () => {
      await expect(
        deleteUsersController.execute(faker.random.numeric(100))
      ).rejects.toThrow(new NotFoundException(notFound("user")));
    });
  });
});
