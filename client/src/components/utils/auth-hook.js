import React, { useState, useContext } from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    login: () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        return token !== null;
    });

    const login = () => setAuthenticated(true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};
