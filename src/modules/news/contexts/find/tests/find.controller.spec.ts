import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper } from "src/shared/entities";
import { NewspapersMockRepository } from "src/shared/mocks/newspapers.mock";
import { FindNewspaperController } from "../find.controller";
import { FindNewspaperService } from "../find.service";

describe("Newspaper", () => {
  let findNewspaperController: FindNewspaperController;
  let findNewspaperService: FindNewspaperService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FindNewspaperController],
      providers: [
        FindNewspaperService,
        {
          provide: getRepositoryToken(Newspaper),
          useValue: NewspapersMockRepository,
        },
      ],
    }).compile();

    findNewspaperService =
      moduleRef.get<FindNewspaperService>(FindNewspaperService);
    findNewspaperController = moduleRef.get<FindNewspaperController>(
      FindNewspaperController
    );
  });

  describe("Find", () => {
    it("should be defined", async () => {
      expect(findNewspaperService).toBeDefined();
      expect(findNewspaperController).toBeDefined();
    });
  });
});
