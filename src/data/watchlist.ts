
export type Show = {
    id: number,
    title: string,
    year: number,
    kind: 'Film' | 'Serie',
}

export const watchlist: Show[] = [
    { id: 1, title: 'Inception', year: 2010, kind: 'Film' },
    { id: 2, title: 'Stranger Things', year: 2016, kind: 'Serie' },
    { id: 3, title: 'Interstellar', year: 2014, kind: 'Film' },
    { id: 4, title: 'Mare fuori', year: 2020, kind: 'Serie' },
    { id: 5, title: 'Oppenheimer', year: 2023, kind: 'Film' },
    { id: 6, title: "La compagnia dell'anello", year: 2001, kind: 'Film' },
]