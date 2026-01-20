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

  if (loading) return <div className="p-4">Loading Catalog...</div>;

  return (
    <div className="component product-list p-4">
      <div className="component-content">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">
                  Code
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">
                  Product Name
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">
                  Description
                </th>
                <th className="py-3 px-4 border-b text-right font-semibold text-gray-700">
                  Price
                </th>
                <th className="py-3 px-4 border-b text-right font-semibold text-gray-700">
                  Stock
                </th>
                <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item.productId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 border-b text-gray-900">
                    {item.productCode}
                  </td>
                  <td className="py-3 px-4 border-b font-medium text-gray-900">
                    {item.productName}
                  </td>
                  <td
                    className="py-3 px-4 border-b text-gray-600 max-w-xs truncate"
                    title={item.description || ""}
                  >
                    {item.description || "-"}
                  </td>
                  <td className="py-3 px-4 border-b text-right text-gray-900">
                    ${Number(item.price).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 border-b text-right text-gray-900">
                    {item.stock}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
