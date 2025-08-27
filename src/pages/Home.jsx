import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Home() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
            <div className="flex flex-col items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
                    <Shield className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    AI-powered Legal Assistance for Everyone
                </h1>
                <p className="max-w-2xl text-slate-600 sm:text-lg">
                    Get instant help with your legal queries. Save, track, and manage
                    your questions in one place.
                </p>
                <Link
                    to="/auth"
                    className="rounded-xl bg-indigo-600 px-6 py-3 text-white shadow-md hover:bg-indigo-700"
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}
