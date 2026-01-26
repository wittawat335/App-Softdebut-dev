import { useQuery } from "@tanstack/react-query";
import { Products } from "@/entities/Products";

const fetchProducts = async (): Promise<Products[]> => {
  const res = await fetch("/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const useProducts = () => {
  return useQuery<Products[]>({
    queryKey: ["products"], 
    queryFn: fetchProducts,
  });
};
