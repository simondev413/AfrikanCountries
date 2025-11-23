import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import "reflect-metadata"


@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  userId!: string;

  @Column()
  method!: string;

  @Column()
  route!: string;

  @Column()
  statusCode!: number;

  @Column()
  ip!: string;

  @Column({ nullable: true })
  userAgent!: string;

  @Column({ type: "json", nullable: true })
  body!: Record<string, any>;

  @Column({ type: "json", nullable: true })
  query!: Record<string, any>;

  @Column({ type: "json", nullable: true })
  params!: Record<string, any>;

  @Column()
  elapsedMs!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
