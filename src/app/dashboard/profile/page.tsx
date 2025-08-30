'use client';
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
    const { data: session } = useSession();
    const userImage = session?.user?.image ?? '';

    return (
        <>
            <h1>Profile Page</h1>
                <hr />
            <div className="flex flex-col space-y-2">
                <span>{session?.user?.name ?? '...'}</span>
                <span>{session?.user?.email ?? '...'}</span>
                <span>{session?.user?.id ?? '...'}</span>
                <span className="capitalize">{session?.user?.roles?.join(' ') ?? ['No-Roles']}</span>
                <Image src={userImage} alt={session?.user?.name ?? '...'} className="rounded-full" width={100} height={100} />
            </div>

        </>
    );
}