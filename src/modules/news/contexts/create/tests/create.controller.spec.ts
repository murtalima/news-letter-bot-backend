import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper } from "src/shared/entities";
import { CreateNewspaperController } from "../create.controller";
import { CreateNewspaperService } from "../create.service";
import {
  NewspapersMockRepository,
  newspaperMockDb,
} from "src/shared/mocks/newspapers.mock";
import { CreateNewsDto } from "../create.dto";
import { faker } from "@faker-js/faker";
import { BadRequestException } from "@nestjs/common";
import { alreadyExist } from "src/config/errorsMessages";

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
          useFactory: NewspapersMockRepository,
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

    it("should create a newspaper successfully", async () => {
      const dto = {
        author: faker.random.words(3),
        content: faker.random.words(faker.datatype.number(100)),
      } as CreateNewsDto;

      await expect(createNewspaperController.execute(dto)).resolves.toEqual(
        expect.objectContaining({
          ...dto,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });

    it("should throw a newspaper already exists", async () => {
      const existentNewspaper = newspaperMockDb[0];

      const dto = {
        author: existentNewspaper.author,
        content: existentNewspaper.content,
      } as CreateNewsDto;

      await expect(createNewspaperController.execute(dto)).rejects.toThrow(
        new BadRequestException(alreadyExist("newspaper"))
      );
    });
  });
});
