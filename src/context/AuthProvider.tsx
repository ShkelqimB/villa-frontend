import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "../helpers/utils";
import { User } from "../interfaces/user.interface";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    user: null,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // check for cookie on mount
        const cookie = getCookie("jwt");
        const localStoragee = localStorage.getItem("jwt");
        if (cookie || localStoragee) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (user: User) => {
        console.log("🚀 ~ file: AuthProvider.tsx:36 ~ login ~ user:", user);
        setUser(user);
        // set cookie and authentication status
        setIsAuthenticated(true);
    };

    const logout = () => {
        // remove cookie and deauthenticate user
        setUser(null);
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
