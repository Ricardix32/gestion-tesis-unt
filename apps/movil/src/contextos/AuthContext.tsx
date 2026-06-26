import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerAccessToken, eliminarTokens, guardarTokens } from '../servicios/almacenamiento';

interface AuthContextType {
  usuario: any;
  cargando: boolean;
  login: (token: string, refresh: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const token = await obtenerAccessToken();
        if (token) {
          const payload = decodificarToken(token);
          setUsuario(payload);
        }
      } catch (e) {
        console.error('Error al cargar token seguro:', e);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, []);

  const login = async (token: string, refresh: string) => {
    await guardarTokens(token, refresh);
    const payload = decodificarToken(token);
    setUsuario(payload);
  };

  const logout = async () => {
    await eliminarTokens();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Decodificación de JWT base64 en entorno móvil
function decodificarToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Polyfill de atob para React Native
function atob(input: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const str = input.replace(/=+$/, '');
  let output = '';
  if (str.length % 4 === 1) {
    throw new Error("'atob' failed: string is not correctly encoded.");
  }
  for (
    let bc = 0, bs = 0, r1 = 0, r2, idx = 0;
    (r2 = str.charAt(idx++));
    ~r2 && ((r1 = bc % 4 ? r1 * 64 + r2 : r2), bc++ % 4)
      ? (output += String.fromCharCode(255 & (r1 >> ((-2 * bc) & 6))))
      : 0
  ) {
    r2 = chars.indexOf(r2);
  }
  return output;
}
