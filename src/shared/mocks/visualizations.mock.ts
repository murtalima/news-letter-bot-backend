import { faker } from "@faker-js/faker";
import { Newspaper, User, Visualization } from "../entities";
import { mockCreateUserObject } from "./users.mock";
import { mockCreateNewspaperObject } from "./newspapers.mock";

export const visualizationsMockDb: Visualization[] = [
  {
    ...mockCreateVisualizationObject(),
  },
  {
    ...mockCreateVisualizationObject(),
  },
  {
    ...mockCreateVisualizationObject(),
  }
];

export const VisualizationsMockRepository = jest.fn(() => ({
  findOne: jest.fn((query: { where: { id: number } }) => {
    const result: Visualization = visualizationsMockDb.find(
      (e) => e.id == query.where.id
    );

    return result as Visualization;
  }),

  create: jest.fn(
    (dto: { newspaper: Newspaper; user: User; grade: number }) => {
      visualizationsMockDb.push({
        ...dto,
        id: faker.datatype.number(100),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Visualization);

      return visualizationsMockDb[
        visualizationsMockDb.length - 1
      ] as Visualization;
    }
  ),
  save: jest.fn((Visualization) => Visualization),
  delete: jest.fn((id: string) => null),
}));

export function mockCreateVisualizationObject() {
  return {
    id: faker.datatype.number(100),
    grade: faker.datatype.boolean() ? 1 : -1,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Visualization;
}
