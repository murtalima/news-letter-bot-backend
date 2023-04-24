import {
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, Visualization } from "src/shared/entities";
import { notFound } from "src/config/errorsMessages";
import { NewspaperRepository } from "src/shared/repositories/newspaper.repository";

@Injectable()
export class GetNewspaperByUserService {
  private readonly logger = new Logger(GetNewspaperByUserService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Visualization)
    private readonly visualizationRepository: Repository<Visualization>,
    private newspaperRepository: NewspaperRepository
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

    const visualizationsIds = user.visualizations?.filter(visualization => visualization && visualization.newspaper).map((e) => e.newspaper.id)
    
    const newspaper = await this.newspaperRepository.findOneNotInList(
      visualizationsIds
    );

    const visualization = this.visualizationRepository.create({
      newspaper,
      user,
      grade: 0,
    });

    await this.visualizationRepository.save(visualization);
    
    let response;

    if(newspaper.visualizations.length) {

      const views = newspaper.visualizations ? newspaper.visualizations.length : 0

      let likes: number[] = newspaper.visualizations
        .map((e) => e.grade)
        .filter((e) => e > 0);

      const numberOfLikes: number = likes ? likes.length : 0;    

      const dislikes = newspaper.visualizations
        .map((e) => e.grade)
        .filter((e) => e < 0)
      
      const numberOfDislies = dislikes ? dislikes.length : 0;

      delete newspaper.visualizations;

      response = {
        ...newspaper,
        views: views,
        likes: numberOfLikes,
        dislikes: numberOfDislies,
      } 
  } else {
      response = {
        ...newspaper,
        views:0,
        likes:0,
        dislikes:0
      }
    }

    return response;
  }
}
