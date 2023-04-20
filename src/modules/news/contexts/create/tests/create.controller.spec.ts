import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper } from "src/shared/entities";
import { CreateNewspaperController } from "../create.controller";
import { CreateNewspaperService } from "../create.service";
import { NewspapersMockRepository } from "src/shared/mocks/newspapers.mock";

describe("Newspaper", () => {
  let createNewspaperController: CreateNewspaperController;
  let createNewspaperService: CreateNewspaperService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateNewspaperController],
      providers: [
        CreateNewspaperService,
        {
          provide: getRepositoryToken(Newspaper),
          useValue: NewspapersMockRepository,
        },
      ],
    }).compile();

    createNewspaperService = moduleRef.get<CreateNewspaperService>(
      CreateNewspaperService
    );
    createNewspaperController = moduleRef.get<CreateNewspaperController>(
      CreateNewspaperController
    );
  });

  describe("Create", () => {
    it("should be defined", async () => {
      expect(createNewspaperService).toBeDefined();
      expect(createNewspaperController).toBeDefined();
    });
  });
});
