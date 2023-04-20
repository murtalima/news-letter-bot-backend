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
import { ApiProperty } from "@nestjs/swagger";

@Entity(RoutesNames.USERS)
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    name: "discord_id",
    nullable: false,
  })
  discordId: string;

  @ApiProperty()
  @Column({
    name: "is_muted",
    nullable: false,
    default: false,
  })
  isMuted: boolean;

  @ApiProperty()
  @Column({
    name: "is_adm",
    nullable: false,
    default: false,
  })
  isAdm: boolean;

  @ApiProperty()
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

  @ApiProperty()
  @OneToMany(() => Visualization, (visualization) => visualization.user)
  visualizations: Visualization[]

  @ApiProperty()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
