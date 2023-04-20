import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFound } from "src/config/errorsMessages";
import { User } from "src/shared/entities";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./update.dto";

@Injectable()
export class UpdateUsersService {
  private readonly logger = new Logger(UpdateUsersService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async execute(dto: UpdateUserDto, discordId: string) {
    this.logger.log(`Update Users`);

    const user = await this.userRepository.findOne({
      where: { discordId: discordId },
      relations: ["guilds"],
    });

    if (!user) {
      throw new NotFoundException(notFound("user"));
    }

    return this.userRepository.save({
      ...user,
      name: dto.name || user.name,
      discordId: discordId,
      isAdm: dto.isAdm != undefined ? dto.isAdm : user.isAdm,
      isMuted: dto.isMuted != undefined ? dto.isMuted : user.isMuted,
    });
  }
}
