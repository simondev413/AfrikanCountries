import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  capital!: string;

  @Column()
  population!: number;

  @Column()
  area!: number;

  @Column()
  isLandlocked!: boolean;

  @Column("simple-array")
  languages!: string[];

  @Column("text",{nullable: true})
  currency!: string | null;

  @Column("decimal", { precision: 10, scale: 6 })
  latitude!: number;

  @Column("decimal", { precision: 10, scale: 6 })
  longitude!: number;
}

export default Country;
