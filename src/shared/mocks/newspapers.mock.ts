import { CreateNewsDto } from "src/modules/news/contexts/create/create.dto";
import { Newspaper } from "../entities";
import { faker } from "@faker-js/faker";
import { mockCreateVisualizationObject } from "./visualizations.mock";
import { FindOperator } from "typeorm";

export const newspaperMockDb: Newspaper[] = [
  {
    id: 1,
    visualizations: [
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
    ],
    author: "Author 1",
    content: "Content 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    visualizations: [
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
    ],
    author: "Author 2",
    content: "Content 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    visualizations: [
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
    ],
    author: "Author 3",
    content: "Content 3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const NewspapersMockRepository = jest.fn(() => ({
  findOne: jest.fn((query: { where: { id?: number; content?: string } }) => {
    const result: Newspaper = newspaperMockDb.find((e) => {
      if (query.where.content) return e.content == query.where.content;
      if (query.where.id) return e.id == query.where.id;
    });
    return result as Newspaper;
  }),
  findOneNotInList: jest.fn((list: number[]) => {
    return newspaperMockDb.filter((e) => !list.includes(e.id))[0];
  }),
  create: jest.fn((dto: CreateNewsDto) => {
    newspaperMockDb.push({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: newspaperMockDb[newspaperMockDb.length - 1].id + 1,
    } as Newspaper);
    return newspaperMockDb[newspaperMockDb.length - 1] as Newspaper;
  }),
  save: jest.fn((Newspaper) => Newspaper),
  delete: jest.fn((discordId: string) => null),
}));

export function mockCreateNewspaperObject() {
  return {
    id: faker.datatype.number(100),
    author: faker.random.words(10),
    content: faker.random.words(1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Newspaper;
}
