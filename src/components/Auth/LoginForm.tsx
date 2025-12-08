'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // После успешного входа редирект на главную
            router.push('/');

            // Можно сохранить пользователя в Zustand, Context или просто localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email
            }));
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 rounded border border-gray-400"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 rounded border border-gray-400"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                Login
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
