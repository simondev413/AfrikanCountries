import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import "reflect-metadata";

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({
    type: "enum",
    enum: ["admin", "user", "moderator"],
    default: "user",
  })
  role!: "admin" | "user" | "moderator";

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", nullable: true })
  createdAt!: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastLogin!: Date;
}

export default User;
