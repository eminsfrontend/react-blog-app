import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { UserLoginData } from "../pages/Login";

interface CurrentUser {
  id: number;
  username: string;
  email: string;
  img?: string | null;
}

interface UserLoginValidation {
  currentUser: CurrentUser | null;
  login?: (inputs: UserLoginData) => {};
  logout?: () => {};
}

interface AuthContextProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = createContext<UserLoginValidation>({
  currentUser: { id: 0, username: "a", email: "a@mail.com" },
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(
    JSON.parse(localStorage.getItem("user") || "") || null
  );

  const login = async (inputs: UserLoginData) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:8000/api/auth/logout", null, {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  // UPDATE LOCALSTORAGE ON CURRENT USER CHANGE
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
