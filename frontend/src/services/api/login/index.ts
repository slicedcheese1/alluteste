import { IInitialRegistration, ILogin } from "@interfaces/interfaces";
import { storage } from "@services/api/storage";
import { client } from "../instance";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface JWTInterface extends JwtPayload {
  id: string;
}

export async function register(payload: IInitialRegistration) {
  try {
    await client.post("auth/register", payload);
    return true;
  } catch (error) {
    return false;
  }
}

export async function login(payload: ILogin) {
  try {
    const response = await client.post("auth/login", payload);
    storage.setToken(response.data);
    const token: JWTInterface = jwtDecode(response.data);
    storage.setUserId(token.id);
    return true;
  } catch (error) {
    return false;
  }
}

export function logout() {
  try {
    storage.removeToken();
    return true;
  } catch (error) {
    return false;
  }
}

export function isAuthenticated() {
  return storage.hasToken();
}
