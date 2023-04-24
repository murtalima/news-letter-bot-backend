import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper, User, Visualization } from "src/shared/entities";
import {
  NewspapersMockRepository,
  mockCreateNewspaperObject,
  newspaperMockDb,
} from "src/shared/mocks/newspapers.mock";
import { GetNewspaperByUserController } from "../getByUser.controller";
import { GetNewspaperByUserService } from "../getByUser.service";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import {
  VisualizationsMockRepository,
  visualizationsMockDb,
} from "src/shared/mocks/visualizations.mock";
import { NewspaperRepository } from "src/shared/repositories/newspaper.repository";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";
import { faker } from "@faker-js/faker";

describe("Newspaper", () => {
  let getNewspaperByUserController: GetNewspaperByUserController;
  let getNewspaperByUserService: GetNewspaperByUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetNewspaperByUserController],
      providers: [
        GetNewspaperByUserService,
        {
          provide: NewspaperRepository,
          useFactory: NewspapersMockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: UsersMockRepository,
        },
        {
          provide: getRepositoryToken(Visualization),
          useFactory: VisualizationsMockRepository,
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

    it("should find a newspaper for a user", async () => {      
      await expect(
        getNewspaperByUserController.execute(usersMockDb[0].discordId)
      ).resolves.toEqual({
        ...newspaperMockDb[0],
        dislikes: expect.any(Number),
        likes: expect.any(Number), 
        views: expect.any(Number),
        visualizations: undefined,
      });
    });

    it("should throw a user not found exception", async () => {
      await expect(
        getNewspaperByUserController.execute(faker.random.alphaNumeric(100))
      ).rejects.toThrow(new NotFoundException(notFound('user')))
    });
  });
});


