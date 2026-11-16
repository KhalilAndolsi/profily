import {
  createContext,
  useContext,
  useState,
} from "react";
import api from "../../lib/api";

const AuthProviderContext = createContext(undefined);

const CURRENT_USER_STORAGE_KEY = "profily-current-user";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

  if (storedUser === null) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const signUp = async (fields) => {
    const response = await api.post("/auth/signup", fields);
    const authenticatedUser = response.data.user;

    localStorage.setItem(
      CURRENT_USER_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    );
    setUser(authenticatedUser);

    return authenticatedUser;
  };

  const login = async (fields) => {
    const response = await api.post("/auth/login", fields);
    const authenticatedUser = response.data.user;

    localStorage.setItem(
      CURRENT_USER_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    );
    setUser(authenticatedUser);

    return authenticatedUser;
  };

  const signOut = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: user !== null,
    login,
    signUp,
    signOut,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthProviderContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthProvider;
