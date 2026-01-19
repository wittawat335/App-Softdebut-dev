import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Orders__C3905BAF12345678", ["orderId"], { unique: true })
@Entity("Orders", { schema: "dbo" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "int", name: "OrderId" })
  orderId!: number;

  @Column("int", { name: "UserId" })
  userId!: number;

  @Column("nvarchar", { name: "OrderNumber", length: 50, unique: true })
  orderNumber!: string;

  @Column("decimal", {
    name: "TotalAmount",
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalAmount!: number;

  @Column("nvarchar", { name: "Status", length: 20, default: "'Pending'" })
  status!: string;

  @Column("nvarchar", { name: "ShippingAddress", length: 500, nullable: true })
  shippingAddress!: string | null;

  @Column("datetime2", { name: "OrderDate", default: () => "sysdatetime()" })
  orderDate!: Date;

  @Column("datetime2", { name: "UpdatedAt", nullable: true })
  updatedAt!: Date | null;
}
