import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateGuildDto } from "./create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { Repository } from "typeorm";
import { alreadyExist } from "src/config/errorsMessages";

@Injectable()
export class CreateGuildsService {
  private readonly logger = new Logger(CreateGuildsService.name);
  constructor(
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(dto: CreateGuildDto) {
    this.logger.log(`Create User ${dto.discordId}:${dto.name}`);

    const guildExists = await this.guildRepository.findOne({
      where: { discordId: dto.discordId },
    });

    if (guildExists) {
      throw new BadRequestException(alreadyExist("user"));
    }

    const guild = this.guildRepository.create(dto);
    
    return this.guildRepository.save(guild);
  }
}
