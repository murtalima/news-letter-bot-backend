import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Visualization } from "./visualization.entity";

@Entity("newspapers")
export class Newspaper {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  id: number;

  @Column({
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
  })
  author: string;
  
  @OneToMany(() => Visualization, (visualization) => visualization.newspaper)
  visualizations: Visualization[]

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
