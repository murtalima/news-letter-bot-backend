import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/shared/entities";
import { UsersMockRepository } from "src/shared/mocks/users.mock";
import { FindUsersController } from "../find.controller";
import { FindUsersService } from "../find.service";

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
          useValue: UsersMockRepository,
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
  });
});
