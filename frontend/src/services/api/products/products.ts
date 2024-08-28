import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../interfaces/interfaces";
import { client } from "../instance";

export async function getAllProducts(): Promise<Product[]> {
  try {
    return await client.get("/products").then(result => {
      return result.data;
    });
  } catch (error) {
    return [];
  }
}

export async function getProductById(productId: string): Promise<Product> {
  try {
    return await client.get(`/products/${productId}`).then(result => {
      return result.data;
    });
  } catch (error) {
    return {} as Product;
  }
}

export const useAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useProductById = (productId: string) => {
  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
