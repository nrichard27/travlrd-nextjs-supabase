import Link from "next/link";

type Props = {
    id: string;
    name: string;
    user_email: string;
    created: string;
    editable: boolean;
}

export default function Business(props: Props) {
    return (
        <div className="p-3 bg-violet-50 rounded flex justify-between items-center">
            <div>
                <h1 className="text-xl font-semibold">{props.name}</h1>
                <span className="text-violet-400 text-sm block">{props.user_email}</span>
                <span className="text-sm block">{props.created}</span>
            </div>
            {
                props.editable && 
                <div>
                    <Link href={`/edit/${props.id}`} className="border border-violet-600 rounded p-2 text-violet-600 text-sm">Edit</Link>
                </div>
            }
        </div>
    );
}
  