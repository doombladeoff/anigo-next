'use client';

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type UserProviderProps = {
    children: ReactNode;
};

type UserContextType = {
    user: User | any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>> | null;
    loading: boolean;
};

const UserContext = createContext<UserContextType>({ user: null, setUser: null, loading: true });

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);