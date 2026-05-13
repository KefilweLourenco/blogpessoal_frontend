import { createContext, type ReactNode, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  handleLogout(): void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    token: "",
    senha: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", userLogin, setUsuario);
      alert("Usuário logado com sucesso");
    } catch (error) {
      alert("Os dados do Usuário estão inconsistentes!");
    }

    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      foto: "",
      token: "",
      senha: "",
    });
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
