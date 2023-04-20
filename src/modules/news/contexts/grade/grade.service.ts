import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { notFound } from "src/config/errorsMessages";
import { User, Visualization } from "src/shared/entities";

@Injectable()
export class GradeNewspaperService {
  private readonly logger = new Logger(GradeNewspaperService.name);
  constructor(
    @InjectRepository(Newspaper) private readonly newspaperRepository: Repository<Newspaper>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Visualization) private readonly visualizationRepository: Repository<Visualization>,
  ) {}
  async execute(newspaperId: number, userId: string, grade: string) {
    this.logger.log(`get news for user: ${newspaperId}`);

    if(grade != 'Like' && grade != 'Dislike') {
      throw new BadRequestException('grade-should-be-like-or-dislike')
    }
    
    let newspaper = await this.newspaperRepository.findOne({
      where: {
        id: newspaperId
      },
      relations: ['visualizations']
    })

    if (!newspaper) throw new NotFoundException(notFound('newspaper'))
    
    const user = await this.userRepository.findOne({ where: { discordId: userId} })

    if (!user) throw new NotFoundException(notFound('user'))

    let gradeNumber = 0
    
    if(grade == 'Like') gradeNumber = 1
    else gradeNumber = -1

    let visualization = await this.visualizationRepository.findOne({
      where: {
        user: {
          id: user.id
        },
        newspaper: {
          id: newspaper.id
        }
      }
    });

    if(!visualization) {
      visualization = this.visualizationRepository.create({
        newspaper,
        user,
        grade: gradeNumber
      });
      
      visualization = await this.visualizationRepository.save(visualization);
    } else {
      visualization.grade = gradeNumber
      await this.visualizationRepository.save(visualization)
    }
    
    newspaper = await this.newspaperRepository.findOne({
      where: {
        id: newspaperId
      },
      relations: ['visualizations']
    })
    
    const views = newspaper.visualizations.length

    const likes = newspaper.visualizations.map((e) => e.grade).filter((e)=> e > 0).length

    const dislikes = newspaper.visualizations.map((e) => e.grade).filter((e)=> e < 0).length

    delete newspaper.visualizations

    const response = {
      ...newspaper,
      views: views,
      likes: likes,
      dislikes: dislikes
    }

    return response;
  }
}
