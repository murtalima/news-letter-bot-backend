import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper, User, Visualization } from "src/shared/entities";
import { NewspapersMockRepository } from "src/shared/mocks/newspapers.mock";
import { GetNewspaperByUserController } from "../getByUser.controller";
import { GetNewspaperByUserService } from "../getByUser.service";
import { UsersMockRepository } from "src/shared/mocks/users.mock";
import { VisualizationsMockRepository } from "src/shared/mocks/visualizations.mock";

describe("Newspaper", () => {
  let getNewspaperByUserController: GetNewspaperByUserController;
  let getNewspaperByUserService: GetNewspaperByUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetNewspaperByUserController],
      providers: [
        GetNewspaperByUserService,
        {
          provide: getRepositoryToken(Newspaper),
          useValue: NewspapersMockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: UsersMockRepository,
        },
        {
          provide: getRepositoryToken(Visualization),
          useValue: VisualizationsMockRepository,
        },
      ],
    }).compile();

    getNewspaperByUserService = moduleRef.get<GetNewspaperByUserService>(
      GetNewspaperByUserService
    );
    getNewspaperByUserController = moduleRef.get<GetNewspaperByUserController>(
      GetNewspaperByUserController
    );
  });

  describe("Get By User", () => {
    it("should be defined", async () => {
      expect(getNewspaperByUserService).toBeDefined();
      expect(getNewspaperByUserController).toBeDefined();
    });
  });
});
