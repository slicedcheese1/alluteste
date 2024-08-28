import { Product } from "@interfaces/interfaces";

const TOKEN_KEY = "token";
const USER_NAME_KEY = "userName";
const USER_ID_KEY = "userID";
const CART_KEY_PREFIX = "cart_";

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function setUserId(userId: string) {
  localStorage.setItem(USER_ID_KEY, userId);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

function hasToken(): boolean {
  return Object.hasOwn(localStorage, TOKEN_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

function setCart(userId: string, products: Product[]) {
  const cart = { userId, products };
  localStorage.setItem(`${CART_KEY_PREFIX}${userId}`, JSON.stringify(cart));
}

function getCart(userId: string): { userId: string; products: Product[] } | null {
  const cart = localStorage.getItem(`${CART_KEY_PREFIX}${userId}`);
  return cart ? JSON.parse(cart) : null;
}

function clearCart(userId: string) {
  localStorage.removeItem(`${CART_KEY_PREFIX}${userId}`);
}

export const storage = {
  setToken,
  setUserId,
  hasToken,
  getToken,
  getUserId,
  removeToken,
  setCart,
  getCart,
  clearCart,
};
