type Props = {
    name: string;
    label: string;
    value: string;
    type: 'text' | 'password';
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: Props) {
    return (
        <div className="w-full">
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} value={props.value} id={props.name} name={props.name} onChange={props.onChange} placeholder={props.label} className="p-2 rounded bg-violet-200 w-full" />
        </div>
    );
}
  