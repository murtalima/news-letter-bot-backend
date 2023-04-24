import { DataSource, In, Not, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Newspaper } from "../entities";

@Injectable()
export class NewspaperRepository extends Repository<Newspaper> {
  constructor(private dataSource: DataSource) {
    super(Newspaper, dataSource.createEntityManager());
  }

  async findOneNotInList(list): Promise<Newspaper | undefined> {
    return await this.findOne({
      where: {
        id: Not(In(list)),
      },
      order: {
        createdAt: "DESC",
      },
      relations: ["visualizations"],
    });
  }
}
