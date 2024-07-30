import axios from "axios";

const baseUrl = "http://localhost:5000/api/auth";

export interface IUser {
  username?: string;
  email: string;
  password: string;
}

export const register = async ({ email, password, username }: IUser) => {
  return await axios.post(`${baseUrl}/signup`, {
    username,
    email,
    password,
  });
};

export const login = async ({ email, password }: IUser) => {
  return await axios.post(`${baseUrl}/login`, {
    email,
    password,
  });
};

export const logout = async () => {
  return localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
  const user = localStorage.getItem("user");
  if (typeof user == "string") {
    return JSON.parse(user);
  }
};
