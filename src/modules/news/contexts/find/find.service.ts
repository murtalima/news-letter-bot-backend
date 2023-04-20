import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { User, Visualization } from "src/shared/entities";
import { notFound } from "src/config/errorsMessages";

@Injectable()
export class FindNewspaperService {
  private readonly logger = new Logger(FindNewspaperService.name);
  constructor(
    @InjectRepository(Newspaper)
    private readonly newspaperRepository: Repository<Newspaper>
  ) {}
  async execute(newspaperId: number) {
    this.logger.log(`get news for user: ${newspaperId}`);

    const newspaper = await this.newspaperRepository.findOne({
      where: {
        id: newspaperId,
      },
      order: {
        createdAt: "DESC",
      },
      relations: ["visualizations"],
    });

    if (!newspaper) throw new NotFoundException(notFound("newspaper"));

    const views = newspaper.visualizations.length;

    const likes = newspaper.visualizations
      .map((e) => e.grade)
      .filter((e) => e > 0).length;

    const dislikes = newspaper.visualizations
      .map((e) => e.grade)
      .filter((e) => e < 0).length;

    delete newspaper.visualizations;

    const response = {
      ...newspaper,
      views: views,
      likes: likes,
      dislikes: dislikes,
    };

    return response;
  }
}
