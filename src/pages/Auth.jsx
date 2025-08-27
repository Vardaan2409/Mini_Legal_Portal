import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
});

const signupSchema = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    confirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
});

export default function Auth() {
    const [tab, setTab] = useState("login");
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const schema = tab === "login" ? loginSchema : signupSchema;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    // const onSubmit = (data) => {
    //     if (tab === "login") {
    //         login(data.email, data.password);
    //     } else {
    //         signup(data.name, data.email, data.password);
    //     }
    //     reset();
    //     navigate("/dashboard");
    // };

    const onSubmit = (data) => {
        let result;
        if (tab === "login") {
            result = login(data.email, data.password);
        } else {
            result = signup(data.name, data.email, data.password);
        }

        if (result.success) {
            reset();
            navigate("/dashboard");
        } else {
            alert(result.message); // or show a styled error message
        }
    };


    return (
        <section className="mx-auto max-w-md px-4 py-12">
            <div className="rounded-2xl border bg-white p-6 shadow-md">
                <div className="mb-6 flex justify-center gap-6">
                    <button
                        onClick={() => setTab("login")}
                        className={`pb-1 text-lg font-medium ${tab === "login"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-slate-600"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setTab("signup")}
                        className={`pb-1 text-lg font-medium ${tab === "signup"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-slate-600"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {tab === "signup" && (
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                {...register("name")}
                                className="mt-1 w-full rounded-xl border p-2"
                                placeholder="John Doe"
                            />
                            <p className="text-xs text-red-500">{errors.name?.message}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="mt-1 w-full rounded-xl border p-2"
                            placeholder="example@mail.com"
                        />
                        <p className="text-xs text-red-500">{errors.email?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="mt-1 w-full rounded-xl border p-2"
                            placeholder="••••••"
                        />
                        <p className="text-xs text-red-500">{errors.password?.message}</p>
                    </div>

                    {tab === "signup" && (
                        <div>
                            <label className="block text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                {...register("confirm")}
                                type="password"
                                className="mt-1 w-full rounded-xl border p-2"
                                placeholder="••••••"
                            />
                            <p className="text-xs text-red-500">{errors.confirm?.message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                    >
                        {tab === "login" ? "Login" : "Sign Up"}
                    </button>
                </form>
            </div>
        </section>
    );
}
