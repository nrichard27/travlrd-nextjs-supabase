'use client';

import { supabaseForClientComponent } from "@/lib/supabase.client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();

    const [email, setEmail] = useState('Loading...');

    useEffect(() => {
        (async () => {
            const { data: user_data, error: user_error } = await supabaseForClientComponent.auth.getUser();

            if (user_error || !user_data.user) {
                router.push('/signout');
                return;
            }

            setEmail(user_data.user.email || 'Error while fetching email!');
        })();
    }, [])

    return (
        <div className="w-full mx-auto p-3 text-sm flex justify-end items-center h-12 bg-violet-50 space-x-3">
            <span>Signed in as <span className="font-semibold">{email}</span></span>
            <Link href="/signout" className="text-red-500 font-semibold">Sign Out</Link>
        </div>
    );
}
  