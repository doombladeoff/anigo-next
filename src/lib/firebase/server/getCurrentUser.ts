import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getUserById } from "./getUserById";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) notFound();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/user/me`, {
        headers: { Cookie: `session=${session.value}` },
        cache: "no-store",
    });

    if (!res.ok) notFound();

    const user = await res.json();

    const userData = await getUserById(user.uid);

    if (!userData) notFound();

    return { user, userData };
}
