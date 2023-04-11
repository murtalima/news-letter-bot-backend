import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Guild } from "./guild.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "user_id",
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
    name: "is_muted",
    nullable: false,
    default: false,
  })
  isMuted: boolean;

  @Column({
    name: "is_adm",
    nullable: false,
    default: false,
  })
  isAdm: boolean;

  @ManyToMany(() => Guild)
  @JoinTable()
  guilds: Guild[];
}
