import { cn } from "../utils/cn";

type InputProps = React.ComponentProps<"input"> & {
    errors?: string[]
}

export function Input({ errors = [], className, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            <input
                {...props}
                className={cn("bg-gray-300 p-2 rounded-lg border-2 border-transparent", {
                    "border-red-500": errors.length > 0
                }, className)}
            />
            {errors.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}
        </div>
    );
}