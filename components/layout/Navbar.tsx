"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);

	useEffect(() => {
		async function loadCurrentUser() {
			const { data } = await getCurrentUser();
			setIsAuthenticated(Boolean(data.user));
		}

		void loadCurrentUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setIsAuthenticated(Boolean(session?.user));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	async function handleSignOut() {
		setIsSigningOut(true);

		const { error } = await signOut();

		if (error) {
			setIsSigningOut(false);
			return;
		}

		setIsOpen(false);
		router.replace("/sign-in");
	}

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<Link
					href="/"
					className="text-lg font-semibold tracking-tight text-slate-950"
					onClick={() => setIsOpen(false)}
				>
					AI Legal Sentinel
				</Link>

				<nav className="hidden items-center gap-2 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
						>
							{link.label}
						</Link>
					))}
					{isAuthenticated ? (
						<button
							type="button"
							onClick={handleSignOut}
							disabled={isSigningOut}
							className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSigningOut ? "Signing Out..." : "Sign Out"}
						</button>
					) : (
						<>
							<Link
								href="/sign-in"
								className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
							>
								Sign In
							</Link>
							<Link
								href="/sign-up"
								className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
							>
								Sign Up
							</Link>
						</>
					)}
				</nav>

				<button
					type="button"
					className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
					onClick={() => setIsOpen((open) => !open)}
					aria-expanded={isOpen}
					aria-controls="mobile-navigation"
					aria-label="Toggle navigation"
				>
					<span className="sr-only">Toggle navigation</span>
					<svg
						className="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						{isOpen ? (
							<path d="M6 6l12 12M18 6 6 18" />
						) : (
							<path d="M4 7h16M4 12h16M4 17h16" />
						)}
					</svg>
				</button>
			</div>

			{isOpen ? (
				<nav
					id="mobile-navigation"
					className="border-t border-slate-200/80 px-6 py-4 md:hidden"
				>
					<div className="mx-auto flex max-w-6xl flex-col gap-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</Link>
						))}
						{isAuthenticated ? (
							<button
								type="button"
								onClick={handleSignOut}
								disabled={isSigningOut}
								className="rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isSigningOut ? "Signing Out..." : "Sign Out"}
							</button>
						) : (
							<>
								<Link
									href="/sign-in"
									className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
									onClick={() => setIsOpen(false)}
								>
									Sign In
								</Link>
								<Link
									href="/sign-up"
									className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
									onClick={() => setIsOpen(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</nav>
			) : null}
		</header>
	);
}
