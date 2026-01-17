import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Users__1788CC4C5434F4F1", ["userId"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "UserId" })
  userId: number;

  @Column("nvarchar", { name: "Username", length: 50 })
  username: string;

  @Column("nvarchar", { name: "Email", length: 100 })
  email: string;

  @Column("nvarchar", { name: "PasswordHash", length: 255 })
  passwordHash: string;

  @Column("bit", { name: "IsActive", default: () => "(1)" })
  isActive: boolean;

  @Column("datetime", { name: "CreatedDate", default: () => "getdate()" })
  createdDate: Date;
}
