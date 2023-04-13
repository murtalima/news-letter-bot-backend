import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Newspaper } from "src/shared/entities/newspaper.entity";
import { CreateNewsDto } from "./create.dto";

@Injectable()
export class CreateNewspaperService {
  private readonly logger = new Logger(CreateNewspaperService.name);
  constructor(
    @InjectRepository(Newspaper) private readonly newspaperRepository: Repository<Newspaper>
  ) {}
  async execute(dto: CreateNewsDto) {
    this.logger.log(`Create News ${dto.author}`);

    const newsExist = await this.newspaperRepository.findOne({
      where: {
        content: dto.content
      }
    })

    if(newsExist) {
      throw new BadRequestException('newspaper-already-register')
    }
    
    const news = this.newspaperRepository.create(dto);
    return this.newspaperRepository.save(news);
  }
}
