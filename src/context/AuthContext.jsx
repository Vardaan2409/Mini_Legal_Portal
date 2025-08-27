// import { createContext, useContext, useState, useMemo } from "react";
// import { loadUser, saveUser, clearUser } from "../utils/storage";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(loadUser());

//     const login = (email, password) => {
//         const existing = loadUser();
//         if (existing && existing.email === email) {
//             setUser(existing);
//             return { ok: true };
//         }
//         const newUser = { email, name: email.split("@")[0] };
//         setUser(newUser);
//         saveUser(newUser);
//         return { ok: true };
//     };

//     const signup = (name, email, password) => {
//         const newUser = { name, email };
//         setUser(newUser);
//         saveUser(newUser);
//         return { ok: true };
//     };

//     const logout = () => {
//         setUser(null);
//         clearUser();
//     };

//     const value = useMemo(() => ({ user, login, signup, logout }), [user]);
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = savedUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (existingUser) {
            setUser(existingUser);
            localStorage.setItem("user", JSON.stringify(existingUser));
            return { success: true };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    };

    const signup = (name, email, password) => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = savedUsers.find((u) => u.email === email);

        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        const newUser = { name, email, password };
        savedUsers.push(newUser);

        localStorage.setItem("users", JSON.stringify(savedUsers));
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
