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
export class GetNewspaperByUserService {
  private readonly logger = new Logger(GetNewspaperByUserService.name);
  constructor(
    @InjectRepository(Newspaper)
    private readonly newspaperRepository: Repository<Newspaper>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Visualization)
    private readonly visualizationRepository: Repository<Visualization>
  ) {}
  async execute(userId: string) {
    this.logger.log(`get news for user: ${userId}`);

    const user = await this.userRepository.findOne({
      where: {
        discordId: userId,
      },
      relations: ["visualizations", "visualizations.newspaper"],
    });

    if (!user) {
      throw new NotFoundException(notFound("user"));
    }

    const visualizationsIds = user.visualizations?.map((e) => e.newspaper?.id);

    const newspaper = await this.newspaperRepository.findOne({
      where: {
        id: Not(In(visualizationsIds)),
      },
      order: {
        createdAt: "DESC",
      },
      relations: ["visualizations"],
    });

    const visualization = this.visualizationRepository.create({
      newspaper,
      user,
      grade: 0,
    });

    await this.visualizationRepository.save(visualization);

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
