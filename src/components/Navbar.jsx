import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, LogOut, Shield } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-semibold sm:text-xl">LegAssist</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link to="/" className="hover:text-indigo-600">Home</Link>
                    <Link to="/auth" className="hover:text-indigo-600">Login/Signup</Link>
                    {user && (
                        <Link to="/dashboard" className="hover:text-indigo-600">
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop actions */}
                <div className="hidden md:block">
                    {user ? (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            <LogOut className="mr-1 inline h-4 w-4" />
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Get Started
                        </Link>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className="rounded-xl border p-2 md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="space-y-2 border-t bg-white px-4 py-4 md:hidden">
                    <Link to="/" className="block hover:text-indigo-600">Home</Link>
                    <Link to="/auth" className="block hover:text-indigo-600">Login/Signup</Link>
                    {user && (
                        <Link to="/dashboard" className="block hover:text-indigo-600">
                            Dashboard
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
