import Header from "@/components/Header";

type Props = {
    children: React.ReactNode;
}

export default async function DashboardLayout(props: Props) {
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}