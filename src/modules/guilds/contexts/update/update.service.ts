import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFound } from "src/config/errorsMessages";
import { Guild } from "src/shared/entities";
import { Repository } from "typeorm";
import { UpdateGuildDto } from "./update.dto";

@Injectable()
export class UpdateGuildsService {
  private readonly logger = new Logger(UpdateGuildsService.name);
  constructor(
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(dto: UpdateGuildDto) {
    this.logger.log(`Update Users`);

    const guild = await this.guildRepository.findOne({
      where: { discordId: dto.discordId },
    });

    if (!guild) {
      throw new NotFoundException(notFound("user"));
    }

    return this.guildRepository.save({
      ...dto,
      discordId: dto.discordId,
      id: guild.id,
    });
  }
}
