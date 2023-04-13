import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Newspaper } from "./newspaper.entity";
import { User } from "./user.entity";

@Entity("visualizations")
export class Visualization {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  id: number;

  @Column()
  grade: number;
  
  @ManyToOne(() => Newspaper, (newspaper) => newspaper.visualizations)
  newspaper: Newspaper;

  @ManyToOne(() => User, (user) => user.visualizations)
  user: User;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
