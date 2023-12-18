'use client';

import Business from "@/components/businesses/Business";
import { Tables } from "@/lib/database.types";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    
    const [businesses, setBusinesses] = useState<Omit<Tables<'businesses'> & {profiles: {email: string} | null}, 'profile_id'>[]>([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        (async () => {
            const { data: businesses_data, error: businesses_error } = await supabaseForClientComponent.from('businesses').select('id, name, created_at, profiles (email)');

            if (businesses_error) {
                return;
            }

            setBusinesses(businesses_data);

            const { data: user_data, error: user_error } = await supabaseForClientComponent.auth.getUser();

            if (user_error || !user_data.user) {
                router.push('/signout');
                return;
            }

            setEmail(user_data.user.email!);
        })();
    }, []);

    return (
        <div className="w-96 mx-auto mt-10">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Businesses</h1>
                <Link href="/create" className="bg-violet-600 rounded p-2 text-white text-sm">Create New</Link>
            </div>
            <div className="flex flex-col space-y-3 justify-center">
                {businesses.length > 0 ? businesses.map((b) => {
                    let editable = false;
                    if (b.profiles!.email == email) editable = true;
                    return <Business editable={editable} key={b.id} name={b.name} id={b.id} created={Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(b.created_at))} user_email={b.profiles!.email} />;
                }) : <p className="text-center p-2 rounded bg-violet-50">The are no businesses yet.</p>}
            </div>
        </div>
    );
}
