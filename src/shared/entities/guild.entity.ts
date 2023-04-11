import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Guild {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "guild_id",
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    name: "discord_id",
    nullable: false,
  })
  discordId: string;

  @Column({
    name: "members_count",
    nullable: false,
    default: 0,
  })
  membersCount: number;
}
