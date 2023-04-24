import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper, User, Visualization } from "src/shared/entities";
import { NewspapersMockRepository, newspaperMockDb } from "src/shared/mocks/newspapers.mock";
import { GradeNewspaperController } from "../grade.controller";
import { GradeNewspaperService } from "../grade.service";
import { UsersMockRepository, usersMockDb } from "src/shared/mocks/users.mock";
import { VisualizationsMockRepository, visualizationsMockDb } from "src/shared/mocks/visualizations.mock";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { faker } from "@faker-js/faker";
import { notFound } from "src/config/errorsMessages";

describe("Newspaper", () => {
  let gradeNewspaperController: GradeNewspaperController;
  let gradeNewspaperService: GradeNewspaperService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GradeNewspaperController],
      providers: [
        GradeNewspaperService,
        {
          provide: getRepositoryToken(Newspaper),
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

    gradeNewspaperService = moduleRef.get<GradeNewspaperService>(
      GradeNewspaperService
    );
    gradeNewspaperController = moduleRef.get<GradeNewspaperController>(
      GradeNewspaperController
    );
    newspaperMockDb[0].visualizations = [visualizationsMockDb[0], visualizationsMockDb[0] ]
  });

  describe("Grade", () => {
    it("should be defined", async () => {
      expect(gradeNewspaperService).toBeDefined();
      expect(gradeNewspaperController).toBeDefined();
    });

    it("should grade a newspaper successfully", async () => {
      await expect(gradeNewspaperController.execute(newspaperMockDb[0].id, usersMockDb[0].discordId, 'Like')).resolves.toEqual({
        ...newspaperMockDb[0],
        dislikes: expect.any(Number),
        likes: expect.any(Number),
        views: expect.any(Number),
        visualizations: undefined,
      })
    });
    it("should throw a grade should be like or dislike", async () => {
      await expect(gradeNewspaperController.execute(newspaperMockDb[0].id, usersMockDb[0].discordId, faker.random.word())).rejects.toThrow(new BadRequestException("grade-should-be-like-or-dislike"))
    });

    it("should throw a newspaper not found", async () => {
      await expect(gradeNewspaperController.execute(faker.datatype.number(100), usersMockDb[0].discordId, 'Like')).rejects.toThrow(new NotFoundException(notFound("newspaper")))
    });

    it("should throw a user not found", async () => {
      await expect(gradeNewspaperController.execute(newspaperMockDb[0].id, faker.random.alphaNumeric(100), 'Like')).rejects.toThrow(new NotFoundException(notFound("user")))
    });

  });
});
