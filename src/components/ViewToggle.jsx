export default function ViewToggle({ view, setView }) {
    return (
        <div className="mb-4 flex gap-2 mt-4">
            <button
                className={`rounded-xl px-3 py-1 text-sm ${view === "cards" ? "bg-indigo-600 text-white" : "bg-slate-200"
                    }`}
                onClick={() => setView("cards")}
            >
                Card View
            </button>
            <button
                className={`rounded-xl px-3 py-1 text-sm ${view === "table" ? "bg-indigo-600 text-white" : "bg-slate-200"
                    }`}
                onClick={() => setView("table")}
            >
                Table View
            </button>
        </div>
    );
}
