'use client';

import FormBase from "@/components/form/Base";
import InputField from "@/components/form/InputField";
import PrimaryButton from "@/components/form/PrimaryButton";
import FormTitle from "@/components/form/Title";
import { authenticateUsingPassword } from "@/lib/supabase.auth.client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Toast from '@radix-ui/react-toast';

export default function Page() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [isToastOpen, setIsToastOpen] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await authenticateUsingPassword({ email, password });

        setIsLoading(false);

        if (error) {
            setIsToastOpen(true);
            return;
        }

        router.push('/');
    }

    return (
        <>
            <FormBase onSubmit={handleSubmit}>
                <FormTitle title="Please Log In" />
                <InputField value={email} name="email" label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
                <InputField value={password} name="password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <PrimaryButton disabled={isLoading} type="submit" title="Login" className="w-full" />
            </FormBase>
            <Toast.Provider swipeDirection="right">
                <Toast.Root open={isToastOpen} onOpenChange={setIsToastOpen} className="bg-red-300 rounded-md w-72 p-2">
                    <Toast.Title className="font-bold">Ooops!</Toast.Title>
                    <Toast.Description>
                        Something went wrong! Are you sure you spelled everything correctly?
                    </Toast.Description>
                </Toast.Root>

                <Toast.Viewport className="absolute right-5 bottom-5" />
            </Toast.Provider>
        </>
    );
}
