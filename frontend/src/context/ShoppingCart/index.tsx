import { IShoppingCartContextType, Product } from "@interfaces/interfaces";
import { storage } from "@services/api/storage";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const ShoppingCartContext = createContext<IShoppingCartContextType>({} as IShoppingCartContextType);

export function ShoppingCartProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);

  function loadProducts() {
    const userId = storage.getUserId();
    if (userId) {
      const storedCart = storage.getCart(userId);
      if (storedCart?.userId === userId) {
        setProducts(storedCart.products);
      } else {
        setProducts([]);
      }
    }
  }

  function saveProducts(products: Product[]) {
    const userId = storage.getUserId();
    if (userId) {
      storage.setCart(userId, products);
    }
  }

  function addProduct(product: Product) {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, product];
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  }

  function removeProduct(productId: string) {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(product => product.id !== productId);
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  }

  function calculateTotal() {
    return products.reduce((total, product) => total + parseFloat(product.annualValue.replace(",", "")), 0).toFixed(2);
  }

  const shoppingCartContextValue: IShoppingCartContextType = {
    products,
    addProduct,
    removeProduct,
    calculateTotal,
    loadProducts,
  };

  return <ShoppingCartContext.Provider value={shoppingCartContextValue}>{children}</ShoppingCartContext.Provider>;
}

export function useShoppingCart(): IShoppingCartContextType {
  return useContext(ShoppingCartContext);
}
