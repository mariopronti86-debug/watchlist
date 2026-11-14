import { type Show } from "../data/watchlist";
import { cn } from "../utils/cn";

type ShowRowProps = {
    show: Show,
    onClick: () => void
}

export function ShowRow({ show, onClick }: ShowRowProps) {
    return (
        <div onClick={onClick} className="flex justify-between items-center px-4 py-2 border border-gray-400 rounded-lg">
            <div className="flex flex-col">
                <p className="font-bold capitalize">{show.title}</p>
                <p className="opacity-75">{show.year}</p>
            </div>

            <span className={cn("rounded-full text-center px-3 text-black/90 capitalize font-semibold", {
                "bg-yellow-200": show.kind === 'Film',
                "bg-purple-200": show.kind === 'Serie',
            })}>{show.kind}</span>
        </div>
    );
}