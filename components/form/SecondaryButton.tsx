import { cl } from "@/lib/utils";

type Props = {
    title: string;
    type: 'button' | 'submit';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function SecondaryButton(props: Props) {
    return <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={cl("p-2 rounded border border-violet-600 text-violet-600 disabled:opacity-50", props.className)}>{props.title}</button>;
}
