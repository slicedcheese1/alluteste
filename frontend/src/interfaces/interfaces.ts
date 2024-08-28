export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContextType {
  isAuthenticated: boolean;
}

export interface IShoppingCartContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  calculateTotal: () => string;
  loadProducts: () => void;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IInitialRegistration {
  name: string;
  username: string;
  password: string;
}

export interface User extends IInitialRegistration {
  id: number;
}

export interface Product {
  id: string;
  name: string;
  technicalDetails: string;
  annualValue: string;
  photos: string[];
}
