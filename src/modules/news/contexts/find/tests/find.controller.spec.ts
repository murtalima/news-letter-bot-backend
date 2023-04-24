import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper } from "src/shared/entities";
import {
  NewspapersMockRepository,
  newspaperMockDb,
} from "src/shared/mocks/newspapers.mock";
import { FindNewspaperController } from "../find.controller";
import { FindNewspaperService } from "../find.service";
import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { notFound } from "src/config/errorsMessages";

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
          useFactory: NewspapersMockRepository,
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

    it("should find a newspaper successfully", async () => {
      await expect(
        findNewspaperController.execute(newspaperMockDb[0].id)
      ).resolves.toEqual(
        expect.objectContaining({
          author: expect.any(String),
          likes: expect.any(Number),
          dislikes: expect.any(Number),
          views: expect.any(Number),
        })
      );
    });

    it("should throw a newspapaper not found", async () => {
      await expect(
        findNewspaperController.execute(
          faker.datatype.number({ min: 3, max: 1000 })
        )
      ).rejects.toThrow(new NotFoundException(notFound("newspaper")));
    });
  });
});
