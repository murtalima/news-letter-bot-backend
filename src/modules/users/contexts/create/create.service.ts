import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { alreadyExist } from "src/config/errorsMessages";
import { Guild } from "src/shared/entities/guild.entity";
import { User } from "src/shared/entities/user.entity";

@Injectable()
export class CreateUsersService {
  private readonly logger = new Logger(CreateUsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>
  ) {}
  async execute(dto: CreateUserDto) {
    this.logger.log(`Create User ${dto.discordId}:${dto.name}`);

    const userExists = await this.userRepository.findOne({
      where: { discordId: dto.discordId },
      relations: ["guilds"],
    });
    
    const userGuild = await this.guildRepository.findOne({
      where: { discordId: dto.guildId },
    });

    if (!userGuild) {
      throw new NotFoundException("guild-not-found");
    }

    if (userExists) {
      throw new BadRequestException(alreadyExist("user"));
    }

    const user = this.userRepository.create({ ...dto, guilds: [userGuild] });
    return this.userRepository.save(user);
  }
}
