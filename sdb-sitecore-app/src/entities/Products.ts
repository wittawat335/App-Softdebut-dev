import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Products__B40CC6CD3CD88837", ["productId"], { unique: true })
@Index("UQ__Products__2F4E024FB6D11EB7", ["productCode"], { unique: true })
@Entity("Products", { schema: "dbo" })
export class Products {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductId" })
  productId: number;

  @Column("nvarchar", { name: "ProductCode", unique: true, length: 50 })
  productCode: string;

  @Column("nvarchar", { name: "ProductName", length: 200 })
  productName: string;

  @Column("nvarchar", { name: "Description", nullable: true, length: 500 })
  description: string | null;

  @Column("decimal", { name: "Price", precision: 10, scale: 2 })
  price: number;

  @Column("int", { name: "Stock", default: () => "(0)" })
  stock: number;

  @Column("bit", { name: "IsActive", default: () => "(1)" })
  isActive: boolean;

  @Column("datetime2", { name: "CreatedAt", default: () => "sysdatetime()" })
  createdAt: Date;

  @Column("datetime2", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;
}
