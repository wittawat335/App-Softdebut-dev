"use client";
import React, { useEffect, useState } from "react";
import { Products } from "@/entities/Products";

const ProductList = (props: any) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div>Loading Catalog...</div>;

  return (
    <div className="component product-list p-4">
      <div className="component-content">
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item.productId}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{item.productName}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-2 text-primary font-bold">${item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
