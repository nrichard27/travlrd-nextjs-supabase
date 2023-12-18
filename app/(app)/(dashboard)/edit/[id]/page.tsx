'use client';

import FormBase from "@/components/form/Base";
import InputField from "@/components/form/InputField";
import PrimaryButton from "@/components/form/PrimaryButton";
import SecondaryButton from "@/components/form/SecondaryButton";
import FormTitle from "@/components/form/Title";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Toast from '@radix-ui/react-toast';

export default function Page({params}: {params: {id: string}}) {
    const router = useRouter();

    const [name, setName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isToastOpen, setIsToastOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabaseForClientComponent.from('businesses').select().eq('id', params.id);
        
            if (error || !data) {
                router.push('/');
                return;
            }

            setName(data[0].name);
        })();
    }, [])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        if (name == '') {
            setIsToastOpen(true);
            setIsUpdating(false);
            return;
        }

        const { data: user_data, error: user_error } = await supabaseForClientComponent.auth.getUser();

        if (user_error || !user_data.user) {
            setIsToastOpen(true);
            setIsUpdating(false);
            return;
        }

        const { data: business_data, error: business_error } = await supabaseForClientComponent.from('businesses').update({ name }).match({ id: params.id }).select();

        if (business_error || business_data.length < 1) {
            setIsToastOpen(true);
            setIsUpdating(false);
            return;
        }

        setIsUpdating(false);
        router.push('/');
    }

    const handleCancel = () => {
        router.push('/');
    }

    const handleDelete = async () => {
        setIsDeleting(true);

        const { data, error } = await supabaseForClientComponent.from('businesses').delete().match({ id: params.id }).select();
    
        if (error || data.length < 1) {
            setIsToastOpen(true);
            setIsDeleting(false);
            return;
        }

        router.push('/');
    }

    return (
        <>
            <FormBase onSubmit={handleSubmit}>
                <FormTitle title="Update Business" />
                <InputField value={name} name="name" label="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <div className="flex justify-end w-full space-x-2">
                    <SecondaryButton type="button" title="Cancel" onClick={handleCancel} />
                    <SecondaryButton disabled={isDeleting} type="button" title="Delete" onClick={handleDelete} />
                    <PrimaryButton disabled={isUpdating} type="submit" title="Save" />
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
  