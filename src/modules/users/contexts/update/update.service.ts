import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFound } from "src/config/errorsMessages";
import { Guild, User } from "src/shared/entities";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./update.dto";

@Injectable()
export class UpdateUsersService {
  private readonly logger = new Logger(UpdateUsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(dto: UpdateUserDto) {
    this.logger.log(`Update Users`);

    const user = await this.userRepository.findOne({
      where: { discordId: dto.discordId },
      relations: ["guilds"],
    });

    if (!user) {
      throw new NotFoundException(notFound("user"));
    }

    if (dto.guildId) {
      const userAlreadyInGuild = user.guilds.filter(
        (e) => e.discordId == dto.guildId
      ).length;
      if (!userAlreadyInGuild) {
        const guild = await this.guildRepository.findOne({
          where: { discordId: dto.guildId },
        });

        if (!guild) {
          throw new NotFoundException("guild-not-found");
        }

        user.guilds.push(guild);
      }
    }
    
    return this.userRepository.save({
      ...user,
      name: dto.name || user.name,
      discordId: dto.discordId,
      isAdm: dto.isAdm != undefined ? dto.isAdm : user.isAdm,
      isMuted: dto.isMuted != undefined ? dto.isMuted : user.isMuted,
    });
  }
}
