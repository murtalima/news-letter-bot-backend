import { ApiProperty } from "@nestjs/swagger";
import { RoutesNames } from "src/config";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: RoutesNames.GUILDS })
export class Guild {
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
    name: "members_count",
    nullable: false,
    default: 0,
  })
  membersCount: number;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
