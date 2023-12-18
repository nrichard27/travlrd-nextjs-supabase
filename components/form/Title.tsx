type Props = {
    title: string;
}

export default function FormTitle(props: Props) {
    return <h1 className="text-2xl font-semibold">{props.title}</h1>;
}
