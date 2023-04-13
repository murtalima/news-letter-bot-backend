import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Guild } from "./guild.entity";
import { Visualization } from "./visualization.entity";
import { RoutesNames } from "src/config";

@Entity(RoutesNames.USERS)
export class User {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
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
  @JoinTable({
    name: "users_guilds",
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "guild",
      referencedColumnName: "id",
    },
  })
  guilds: Guild[];

  @OneToMany(() => Visualization, (visualization) => visualization.user)
  visualizations: Visualization[]

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
