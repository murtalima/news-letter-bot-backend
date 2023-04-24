import { Guild } from "../entities";
import { CreateGuildDto } from "src/modules/guilds/contexts/create/create.dto";
import { faker } from "@faker-js/faker";

export function mockCreateGuildObject() {
  return {
    name: faker.random.words(2),
    discordId: faker.random.alphaNumeric(100),
    membersCount: faker.datatype.number(100),
    id: faker.datatype.number(100),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Guild;
}
export const guildMockDb: Guild[] = [
  {
    discordId: "123456789",
    name: "Teste",
    createdAt: new Date(),
    id: 1,
    membersCount: 12,
    updatedAt: new Date(),
  },
  {
    discordId: "234567891",
    name: "Teste 2",
    createdAt: new Date(),
    id: 2,
    membersCount: 23,
    updatedAt: new Date(),
  },
  {
    discordId: "345678912",
    name: "Teste 3",
    createdAt: new Date(),
    id: 3,
    membersCount: 34,
    updatedAt: new Date(),
  },
];
export const GuildsMockRepository = jest.fn(() => ({
  findOne: jest.fn((query: { where: { discordId: string } }) => {
    const result: Guild = guildMockDb.find(
      (e) => e.discordId == query.where.discordId
    );
    return result;
  }),
  create: jest.fn((dto: CreateGuildDto) => {
    guildMockDb.push({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: guildMockDb[guildMockDb.length - 1].id + 1,
    } as Guild);
    return guildMockDb[guildMockDb.length - 1] as Guild;
  }),
  save: jest.fn((Guild) => Guild),
  delete: jest.fn((discordId: string) => null),
}));
