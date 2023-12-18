'use client';

import FormBase from "@/components/form/Base";
import InputField from "@/components/form/InputField";
import PrimaryButton from "@/components/form/PrimaryButton";
import SecondaryButton from "@/components/form/SecondaryButton";
import FormTitle from "@/components/form/Title";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Toast from '@radix-ui/react-toast';

export default function Page() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [isToastOpen, setIsToastOpen] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);

        if (name == '') {
            setIsToastOpen(true);
            setIsSaving(false);
            return;
        }

        const { data: user_data, error: user_error } = await supabaseForClientComponent.auth.getUser();

        if (user_error || !user_data.user) {
            setIsToastOpen(true);
            setIsSaving(false);
            return;
        }

        const { error: business_error } = await supabaseForClientComponent.from('businesses').insert({ name, profile_id: user_data.user.id });

        if (business_error) {
            setIsToastOpen(true);
            setIsSaving(false);
            return;
        }

        setIsSaving(false);
        router.push('/');
    }

    const handleCancel = () => {
        router.push('/');
    }

    return (
        <>
            <FormBase onSubmit={handleSubmit}>
                <FormTitle title="Create New Business" />
                <InputField value={name} name="name" label="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <div className="flex justify-end w-full space-x-2">
                    <SecondaryButton type="button" title="Cancel" onClick={handleCancel} />
                    <PrimaryButton disabled={isSaving} type="submit" title="Save" />
                </div>
            </FormBase>
            <Toast.Provider swipeDirection="right">
                <Toast.Root open={isToastOpen} onOpenChange={setIsToastOpen} className="bg-red-300 rounded-md w-72 p-2">
                    <Toast.Title className="font-bold">Ooops!</Toast.Title>
                    <Toast.Description>
                        Something went wrong!
                    </Toast.Description>
                </Toast.Root>

                <Toast.Viewport className="absolute right-5 bottom-5" />
            </Toast.Provider>
        </>
    );
}
  