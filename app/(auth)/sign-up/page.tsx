"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { signUp, syncUserProfile } from "@/lib/auth";

export default function SignUpPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		setError(null);
		setSuccessMessage(null);

		const { data: signUpData, error: signUpError } = await signUp(email, password);

		if (signUpError) {
			setError(signUpError.message);
			setIsLoading(false);
			return;
		}

		const createdUser = signUpData.user;
		if (createdUser?.id && createdUser.email) {
			const response = await syncUserProfile(
				createdUser.id,
				createdUser.email,
				username,
			);

			if (!response.ok) {
				const body = (await response.json()) as { error?: string };
				setError(
					`Account created in Auth, but failed to sync users table: ${body.error ?? "Unknown error"}`,
				);
				setIsLoading(false);
				return;
			}
		}

		if (signUpData.session) {
			router.replace("/dashboard");
			router.refresh();
			return;
		}

		setSuccessMessage("Signup successful. Check your email to confirm your account.");
		setIsLoading(false);
	}

	return (
		<main className="min-h-screen bg-slate-50 px-4 py-12">
			<section className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				<h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>

				<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							required
							placeholder="yourname"
							className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
						/>
					</div>

					<div>
						<label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
							placeholder="you@example.com"
							className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
							className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isLoading ? "Creating account..." : "Sign Up"}
					</button>
				</form>

				{error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
				{successMessage ? <p className="mt-4 text-sm text-emerald-700">{successMessage}</p> : null}
			</section>
		</main>
	);
}
