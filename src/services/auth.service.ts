import { AxiosError } from "axios";
import { tesloApi } from "../api/teslo.api";
import { LoginResponse } from "../interfaces/responses.interfaces";

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error en el login");
    }
  };

  static checkAuth = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error en el checkAuth");
    }
  };
}
