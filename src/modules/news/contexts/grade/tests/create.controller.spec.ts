import { Test } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Newspaper, User, Visualization } from "src/shared/entities";
import { NewspapersMockRepository } from "src/shared/mocks/newspapers.mock";
import { GradeNewspaperController } from "../grade.controller";
import { GradeNewspaperService } from "../grade.service";
import { UsersMockRepository } from "src/shared/mocks/users.mock";
import { VisualizationsMockRepository } from "src/shared/mocks/visualizations.mock";

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

    gradeNewspaperService = moduleRef.get<GradeNewspaperService>(
      GradeNewspaperService
    );
    gradeNewspaperController = moduleRef.get<GradeNewspaperController>(
      GradeNewspaperController
    );
  });

  describe("Grade", () => {
    it("should be defined", async () => {
      expect(gradeNewspaperService).toBeDefined();
      expect(gradeNewspaperController).toBeDefined();
    });
  });
});
