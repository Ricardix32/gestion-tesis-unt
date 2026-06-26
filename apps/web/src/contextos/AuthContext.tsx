'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  usuario: any;
  login: (token: string, refresh: string) => void;
  logout: () => void;
  verificarRol: (rolesPermitidos: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Hidratar estado desde localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuario(payload);
      } catch (e) {
        console.error('Error al decodificar token almacenado:', e);
      }
    }
  }, []);

  const login = (token: string, refresh: string) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUsuario(payload);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.clear();
    setUsuario(null);
    router.push('/login');
  };

  const verificarRol = (rolesPermitidos: string[]) => {
    if (!usuario) return false;
    return rolesPermitidos.some(rol => usuario.roles?.includes(rol));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, verificarRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
