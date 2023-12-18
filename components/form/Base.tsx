type Props = {
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export default function FormBase(props: Props) {
    return (
        <form onSubmit={props.onSubmit} className="flex flex-col items-center justify-center p-3 rounded-lg space-y-3 bg-violet-50 w-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {props.children}
        </form>
    );
}
