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
  async execute(dto: UpdateGuildDto, discordId: string) {
    this.logger.log(`Update Users`);

    const guild = await this.guildRepository.findOne({
      where: { discordId },
    });

    if (!guild) {
      throw new NotFoundException(notFound("guild"));
    }

    return this.guildRepository.save({
      ...dto,
      discordId,
      id: guild.id,
    });
  }
}
