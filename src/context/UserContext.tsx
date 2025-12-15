'use client';

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type UserProviderProps = {
    initialUser: any | null;
    children: ReactNode;
};

type UserContextType = {
    user: any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>> | null;
};

const UserContext = createContext<UserContextType>({ user: null, setUser: null });

export const UserProvider = ({ initialUser, children }: UserProviderProps) => {
    const [user, setUser] = useState<any | null>(initialUser);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return unsub;
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);