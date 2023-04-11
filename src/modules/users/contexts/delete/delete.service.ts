import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/shared/entities";
import { Repository } from "typeorm";
import { notFound } from "src/config/errorsMessages";

@Injectable()
export class DeleteUsersService {
  private readonly logger = new Logger(DeleteUsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async execute(discordId: string) {
    this.logger.log(`Delete User ${discordId}`);

    const user = await this.userRepository.findOne({
      where: { discordId: discordId },
    });

    if (!user) {
      throw new NotFoundException(notFound("user"));
    }

    return this.userRepository.delete(user);
  }
}
