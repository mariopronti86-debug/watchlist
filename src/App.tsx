import { useState } from "react"
import { ShowRow } from "./components/ShowRow"
import { AddShowForm } from "./components/AddShowForm"
import { watchlist as initialWatchList, type Show } from "./data/watchlist"
import { cn } from "./utils/cn";

type Filter = "Tutti" | "Film" | "Serie"

function App() {
  const [nextWatch, setNextWatch] = useState<Show>();
  const [activeFilter, setActiveFilter] = useState<Filter>("Tutti");
  const [watchlist, setWatchList] = useState(initialWatchList);

  function onShowClick(show: Show) {
    if (nextWatch?.id === show.id) {
      setNextWatch(undefined);
    } else {
      setNextWatch(show)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-12">
        <h1 className="font-bold text-4xl text-center">La mia watchlist</h1>

        <div className="flex gap-4 mt-4">
          {["Tutti", "Film", "Serie"].map(filtro =>
            <button key={filtro}
              className={cn("px-4 py-2 bg-gray-200 rounded-full font-semibold", {
                "bg-blue-400": activeFilter === filtro
              })}
              onClick={() => setActiveFilter(filtro as Filter)}
            >{filtro}</button>)}
        </div>

        <div className="w-xl flex flex-col gap-4 py-4">
          {watchlist
            .filter(show => activeFilter === "Tutti" || show.kind === activeFilter)
            .map(show => <ShowRow onClick={() => onShowClick(show)} show={show} key={show.id} />)}
        </div>

        <p>
          {watchlist.length} titoli: {watchlist.filter(show => show.kind === "Film").length} film e {watchlist.filter(show => show.kind === "Serie").length} serie
        </p>

        {nextWatch && <p className="font-bold">Stasera guardo: <span className="capitalize">{nextWatch.title}</span></p>}

        <div className="mt-8">
          <AddShowForm
            existingTitles={watchlist.map(show => show.title)}
            onSubmit={(newShow) => {
              setWatchList(prev => [...prev, {
                id: Math.max(...prev.map(show => show.id)) + 1,
                ...newShow,
              }])
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App