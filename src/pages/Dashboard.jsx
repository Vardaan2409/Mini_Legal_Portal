import { useAuth } from "../context/AuthContext";
import { loadQueries, saveQueries, seedDemoQueries } from "../utils/storage";
import { useEffect, useState } from "react";
import QueryList from "../components/QueryList";
import QueryTable from "../components/QueryTable";
import ViewToggle from "../components/ViewToggle";

export default function Dashboard() {
    const { user } = useAuth();
    const [queries, setQueries] = useState([]);
    const [newQuery, setNewQuery] = useState("");
    const [view, setView] = useState("cards");

    useEffect(() => {
        seedDemoQueries();
        setQueries(loadQueries());
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newQuery.trim()) return;
        const updated = [
            {
                id: crypto.randomUUID(),
                text: newQuery,
                createdAt: new Date().toISOString(),
                by: user.email,
            },
            ...queries,
        ];
        setQueries(updated);
        saveQueries(updated);
        setNewQuery("");
    };

    const handleDelete = (id) => {
        const updated = queries.filter((q) => q.id !== id);
        setQueries(updated);
        saveQueries(updated);
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold">Welcome, {user?.name || user?.email}</h2>

            <form onSubmit={handleAdd} className="mt-6 flex gap-2">
                <input
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    className="flex-1 rounded-xl border p-2"
                    placeholder="Enter your legal query..."
                />
                <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                    Add
                </button>
            </form>

            <ViewToggle view={view} setView={setView} />

            {queries.length === 0 ? (
                <p className="mt-6 text-slate-500">No queries yet.</p>
            ) : view === "cards" ? (
                <QueryList queries={queries} onDelete={handleDelete} />
            ) : (
                <QueryTable queries={queries} onDelete={handleDelete} />
            )}
        </section>
    );
}
