import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { User, Visualization } from "src/shared/entities";
import { notFound } from "src/config/errorsMessages";

@Injectable()
export class GetNewspaperByUserService {
  private readonly logger = new Logger(GetNewspaperByUserService.name);
  constructor(
    @InjectRepository(Newspaper) private readonly newspaperRepository: Repository<Newspaper>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Visualization) private readonly visualizationRepository: Repository<Visualization>,
  ) {}
  async execute(userId: string) {
    this.logger.log(`get news for user: ${userId}`);

    const user = await this.userRepository.findOne({
      where: {
        discordId: userId
      },
      relations: ['visualizations', 'visualizations.newspaper'],
    })

    if(!user) {
      throw new BadRequestException(notFound('user'))
    }
    
    const visualizationsIds = user.visualizations?.map((e) => e.newspaper?.id)

    console.log(user.visualizations)
    const newspaper = await this.newspaperRepository.findOne({
      where: {
        id: Not(In(visualizationsIds))
      },
      order: {
        createdAt: "DESC"
      }
    })

    
    const visualization = this.visualizationRepository.create({
      newspaper,
      user,
      grade: 0
    });
    
    const savedVisualization = await this.visualizationRepository.save(visualization);
    return newspaper;
  }
}
