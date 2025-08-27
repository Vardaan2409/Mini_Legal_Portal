import { createContext, useContext, useState, useMemo } from "react";
import { loadUser, saveUser, clearUser } from "../utils/storage";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(loadUser());

    const login = (email, password) => {
        const existing = loadUser();
        if (existing && existing.email === email) {
            setUser(existing);
            return { ok: true };
        }
        const newUser = { email, name: email.split("@")[0] };
        setUser(newUser);
        saveUser(newUser);
        return { ok: true };
    };

    const signup = (name, email, password) => {
        const newUser = { name, email };
        setUser(newUser);
        saveUser(newUser);
        return { ok: true };
    };

    const logout = () => {
        setUser(null);
        clearUser();
    };

    const value = useMemo(() => ({ user, login, signup, logout }), [user]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
