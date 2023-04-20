import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Newspaper } from "./newspaper.entity";
import { User } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("visualizations")
export class Visualization {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  id: number;

  @ApiProperty()
  @Column()
  grade: number;

  @ApiProperty()
  @ManyToOne(() => Newspaper, (newspaper) => newspaper.visualizations)
  newspaper: Newspaper;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.visualizations)
  user: User;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
