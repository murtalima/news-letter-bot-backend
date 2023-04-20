import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Visualization } from "./visualization.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("newspapers")
export class Newspaper {
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
  content: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  author: string;
  
  @ApiProperty()
  @OneToMany(() => Visualization, (visualization) => visualization.newspaper)
  visualizations: Visualization[]

  @ApiProperty()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
