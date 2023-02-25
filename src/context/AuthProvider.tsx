import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "../helpers/utils";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // check for cookie on mount
        const cookie = getCookie("jwt");
        if (cookie) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string) => {
        console.log("🚀 ~ file: AuthProvider.tsx:32 ~ login ~ token:", token);
        // set cookie and authentication status
        setIsAuthenticated(true);
    };

    const logout = () => {
        // remove cookie and deauthenticate user
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
