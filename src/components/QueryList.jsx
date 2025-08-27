export default function QueryList({ queries, onDelete }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {queries.map((q) => (
                <div
                    key={q.id}
                    className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                    <p className="text-slate-700">{q.text}</p>
                    <p className="mt-2 text-xs text-slate-400">
                        {new Date(q.createdAt).toLocaleString()}
                    </p>
                    <button
                        onClick={() => onDelete(q.id)}
                        className="mt-2 text-xs text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
