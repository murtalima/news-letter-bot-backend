import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFound } from "src/config/errorsMessages";
import { Guild } from "src/shared/entities";
import { Repository } from "typeorm";

@Injectable()
export class FindGuildsService {
  private readonly logger = new Logger(FindGuildsService.name);
  constructor(
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(discordId: string) {
    this.logger.log(`Find Users`);
    const guild = await this.guildRepository.findOne({ where: { discordId } });

    if (!guild) {
      throw new NotFoundException(notFound("user"));
    }

    return guild;
  }
}
