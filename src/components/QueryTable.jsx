export default function QueryTable({ queries, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border text-sm">
                <thead className="bg-slate-100 text-left">
                    <tr>
                        <th className="p-2">Query</th>
                        <th className="p-2">Created At</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map((q) => (
                        <tr key={q.id} className="border-t">
                            <td className="p-2">{q.text}</td>
                            <td className="p-2">
                                {new Date(q.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2">
                                <button
                                    onClick={() => onDelete(q.id)}
                                    className="text-xs text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
