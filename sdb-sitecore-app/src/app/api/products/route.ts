import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { Products } from "@/entities/Products";

export async function GET() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const repo = AppDataSource.getRepository(Products);

  const products = await repo.find({
    where: { isActive: true },
    order: { createdAt: "DESC" },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const repo = AppDataSource.getRepository(Products);

  const product = repo.create(body);
  await repo.save(product);

  return NextResponse.json(product, { status: 201 });
}
