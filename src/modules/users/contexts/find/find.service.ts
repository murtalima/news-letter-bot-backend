import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFound } from "src/config/errorsMessages";
import { User } from "src/shared/entities";
import { Repository } from "typeorm";

@Injectable()
export class FindUsersService {
  private readonly logger = new Logger(FindUsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async execute(discordId: string) {
    this.logger.log(`Find Users`);
    const user = await this.userRepository.findOne({
      where: { discordId },
      relations: ["guilds"],
    });

    if (!user) {
      throw new NotFoundException(notFound("user"));
    }

    return user;
  }
}
