import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { alreadyExist, notFound } from "src/config/errorsMessages";
import { Guild } from "src/shared/entities/guild.entity";
import { User } from "src/shared/entities/user.entity";
import { AddGuildUserDto } from "./addGuild.dto";

@Injectable()
export class AddGuildUsersService {
  private readonly logger = new Logger(AddGuildUsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(dto: AddGuildUserDto, userId: string) {
    this.logger.log(`Adding Guild (${dto.guildId}) to User ${userId}`);

    const user = await this.userRepository.findOne({
      where: { discordId: userId },
      relations: ["guilds"],
    });

    const guild = await this.guildRepository.findOne({
      where: { discordId: dto.guildId },
    });

    if (!guild) {
      throw new NotFoundException("guild-not-found");
    }

    if (!user) {
      throw new NotFoundException(notFound("user"));
    }

    const userAlreadyInGuild = user.guilds.filter(
      (e) => e.discordId == dto.guildId
    ).length;

    if (userAlreadyInGuild) {
      throw new BadRequestException(alreadyExist('guild'))
    }

    user.guilds.push(guild);
    
    await this.userRepository.save(user);
  }
}
