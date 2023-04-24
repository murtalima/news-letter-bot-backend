import { faker } from "@faker-js/faker";
import { User } from "../entities";
import { mockCreateGuildObject } from "./guilds.mock";
import { mockCreateVisualizationObject } from "./visualizations.mock";
import { CreateUserDto } from "src/modules/users/contexts/create/create.dto";

export const usersMockDb: User[] = [
  {
    ...mockCreateUserObject(),
    guilds: [mockCreateGuildObject(), mockCreateGuildObject()],
    visualizations: [
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
    ],
  },
  {
    ...mockCreateUserObject(),
    guilds: [mockCreateGuildObject(), mockCreateGuildObject()],
    visualizations: [
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
    ],
  },
  {
    ...mockCreateUserObject(),
    guilds: [mockCreateGuildObject(), mockCreateGuildObject()],
    visualizations: [
      mockCreateVisualizationObject(),
      mockCreateVisualizationObject(),
    ],
  },
];

export const UsersMockRepository = jest.fn(() => ({
  findOne: jest.fn((query: { where: { discordId: string } }) => {
    const result: User = usersMockDb.find(
      (e) => e.discordId == query.where.discordId
    );

    return result as User;
  }),
  create: jest.fn((dto: CreateUserDto) => {
    usersMockDb.push({
      ...dto,
      guilds: [],
      visualizations: [],
      id: faker.datatype.number(100),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);

    return usersMockDb[usersMockDb.length - 1] as User;
  }),
  save: jest.fn((Newspaper) => Newspaper),
  delete: jest.fn((discordId: string) => null),
}));

export function mockCreateUserObject() {
  return {
    name: faker.random.words(2),
    discordId: faker.random.alphaNumeric(100),
    isAdm: faker.datatype.boolean(),
    id: faker.datatype.number(100),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;
}
