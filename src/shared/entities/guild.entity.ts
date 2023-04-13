import { RoutesNames } from "src/config";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: RoutesNames.GUILDS})
export class Guild {
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
    name: "members_count",
    nullable: false,
    default: 0,
  })
  membersCount: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
