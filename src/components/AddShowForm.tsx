import { useState } from "react";
import type { Show } from "../data/watchlist";
import { cn } from "../utils/cn";
import { Input } from "./Input";

type AddShowFormProps = {
    // Omit crea un tipo senza l'id: l'id lo aggiunge App
    onSubmit?: (data: Omit<Show, 'id'>) => void,
    // il form non conosce la lista, gli passiamo solo i titoli per controllare i doppioni
    existingTitles: string[],
}

const defaultState = {
    values: {
        title: "",
        year: 0,
        kind: "Film" as Show['kind'],
    },
    errors: {
        title: [] as string[],
        year: [] as string[],
    }
}

export function AddShowForm({ onSubmit, existingTitles }: AddShowFormProps) {
    const [formState, setFormState] = useState(defaultState);

    function addShow(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const { title, year } = formState.values;
        const currentYear = new Date().getFullYear();

        let errors = { ...defaultState.errors };

        // titolo
        if (!title.trim()) {
            errors = { ...errors, title: ['Titolo obbligatorio!'] }
        } else {
            if (title.trim().length < 2) {
                errors = { ...errors, title: [...errors.title, 'Inserisci almeno 2 caratteri!'] }
            }
            if (existingTitles.some(t => t.toLowerCase() === title.trim().toLowerCase())) {
                errors = { ...errors, title: [...errors.title, 'Questo titolo è già in lista!'] }
            }
        }

        // anno
        if (year < 1900 || year > currentYear) {
            errors = { ...errors, year: [`L'anno deve essere tra il 1900 e il ${currentYear}!`] }
        }

        // se ha un solo errore non aggiunge niente
        if (Object.values(errors).some(arr => arr.length)) {
            setFormState(prev => ({ ...prev, errors }));
            return;
        }

        onSubmit?.({ ...formState.values, title: title.trim() });
        setFormState(defaultState);
    }

    return (
        <form onSubmit={addShow} className="flex flex-col gap-4">
            <h1 className="font-bold text-xl text-center">Aggiungi un Titolo</h1>

            <Input
                placeholder="Titolo"
                value={formState.values.title}
                errors={formState.errors.title}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, title: e.target.value },
                    }))
                }}
            />

            <Input
                placeholder="Anno"
                type="number"
                value={formState.values.year}
                errors={formState.errors.year}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, year: +e.target.value },
                    }))
                }}
            />

            <div className="flex gap-4">
                {(["Film", "Serie"] as const).map(k =>
                    <button
                        key={k}
                        type="button" // senza questo invierebbe il form
                        className={cn("px-4 py-2 bg-gray-300 rounded-full font-semibold", {
                            "bg-blue-400": formState.values.kind === k
                        })}
                        onClick={() => {
                            setFormState(prev => ({
                                ...prev,
                                values: { ...prev.values, kind: k },
                            }))
                        }}
                    >{k}</button>
                )}
            </div>

            <button className="rounded-full px-4 py-2 bg-blue-400 font-semibold">Aggiungi</button>
        </form>
    );
}