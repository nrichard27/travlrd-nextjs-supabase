import { cl } from "@/lib/utils";

type Props = {
    title: string;
    type: 'button' | 'submit';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function PrimaryButton(props: Props) {
    return <button type={props.type} disabled={props.disabled} onClick={props.onClick} className={cl("p-2 rounded bg-violet-600 text-white disabled:opacity-50", props.className)}>{props.title}</button>;
}
