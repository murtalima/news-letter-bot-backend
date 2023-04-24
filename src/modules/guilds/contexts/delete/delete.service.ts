import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guild } from "src/shared/entities";
import { Repository } from "typeorm";
import { notFound } from "src/config/errorsMessages";

@Injectable()
export class DeleteGuildsService {
  private readonly logger = new Logger(DeleteGuildsService.name);
  constructor(
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(discordId: string) {
    this.logger.log(`Delete Guild ${discordId}`);

    const guild = await this.guildRepository.findOne({
      where: { discordId: discordId },
    });

    if (!guild) {
      throw new NotFoundException(notFound("user"));
    }

    return this.guildRepository.delete(guild);
  }
}
