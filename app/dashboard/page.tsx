"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser, getCurrentUserProfile, signOut, type UserProfile } from "@/lib/auth";

type ChatMessage = {
	id: string;
	role: "user" | "ai";
	text: string;
	isError?: boolean;
};

export default function DashboardPage() {
	const router = useRouter();
	const [isCheckingSession, setIsCheckingSession] = useState(true);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			id: "welcome-message",
			role: "ai",
			text: "Hello. Ask your legal question and I will help you with a first-level guidance response.",
		},
	]);
	const [inputMessage, setInputMessage] = useState("");
	const [isSendingMessage, setIsSendingMessage] = useState(false);

	useEffect(() => {
		async function checkSession() {
			const { data, error } = await getCurrentUser();

			if (error || !data.user) {
				router.replace("/sign-in");
				return;
			}

			setUserEmail(data.user.email ?? null);

			const { data: profileData } = await getCurrentUserProfile();
			setUserProfile(profileData ?? null);
			setIsCheckingSession(false);
		}

		void checkSession();
	}, [router]);

	async function handleSignOut() {
		setIsSigningOut(true);

		const { error } = await signOut();

		if (error) {
			setIsSigningOut(false);
			return;
		}

		router.replace("/sign-in");
	}

	async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const message = inputMessage.trim();
		if (!message || isSendingMessage) {
			return;
		}

		const userMessage: ChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			text: message,
		};

		setMessages((currentMessages) => [...currentMessages, userMessage]);
		setInputMessage("");
		setIsSendingMessage(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			const body = (await response.json()) as { response?: string; error?: string };
			const aiText = body.response;

			if (!response.ok || typeof aiText !== "string" || !aiText.trim()) {
				throw new Error(body.error ?? "Failed to get a response from AI.");
			}

			setMessages((currentMessages) => [
				...currentMessages,
				{
					id: `ai-${Date.now()}`,
					role: "ai",
					text: aiText,
				},
			]);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown server error.";

			setMessages((currentMessages) => [
				...currentMessages,
				{
					id: `ai-error-${Date.now()}`,
					role: "ai",
					text: `AI Error: ${errorMessage}`,
					isError: true,
				},
			]);
		} finally {
			setIsSendingMessage(false);
		}
	}

	if (isCheckingSession) {
		return (
			<section className="mx-auto w-full max-w-3xl rounded-3xl bg-slate-50 p-8 shadow-sm shadow-slate-200/70 sm:p-10">
				<p className="text-sm text-slate-600">Checking your session...</p>
			</section>
		);
	}

	return (
		<section className="mx-auto w-full max-w-3xl rounded-3xl bg-slate-50 p-8 shadow-sm shadow-slate-200/70 sm:p-10">
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
					<div className="space-y-2">
						<h1 className="text-4xl font-semibold tracking-tight text-slate-950">
							Dashboard
						</h1>
						<p className="text-sm text-slate-600">Choose what you want to do next.</p>
						{userEmail ? (
							<p className="text-sm text-slate-700">Signed in as {userEmail}</p>
						) : null}
						{userProfile?.role ? (
							<p className="inline-flex w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
								Role: {userProfile.role}
							</p>
						) : null}
					</div>

					<button
						type="button"
						onClick={handleSignOut}
						disabled={isSigningOut}
						className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isSigningOut ? "Signing out..." : "Sign Out"}
					</button>
				</div>

				{userProfile?.role === "lawyer" ? (
					<div className="flex flex-col gap-4 sm:flex-row">
						<button
							type="button"
							className="flex-1 rounded-2xl bg-slate-950 px-6 py-4 text-base font-medium text-white transition hover:bg-slate-800"
						>
							Review Consultations
						</button>
						<button
							type="button"
							className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
						>
							Manage Profile
						</button>
					</div>
				) : (
					<div className="flex flex-col gap-4 sm:flex-row">
						<button
							type="button"
							className="flex-1 rounded-2xl bg-slate-950 px-6 py-4 text-base font-medium text-white transition hover:bg-slate-800"
						>
							Start Chat
						</button>
						<button
							type="button"
							className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
						>
							Find Lawyer
						</button>
					</div>
				)}

				<section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-slate-900">Legal Chat</h2>
						<p className="text-xs text-slate-500">AI assistant</p>
					</div>

					<div className="h-72 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-6 ${
										message.role === "user"
											? "bg-slate-900 text-white"
											: message.isError
												? "border border-red-200 bg-red-50 text-red-700"
												: "bg-white text-slate-800 border border-slate-200"
									}`}
								>
									{message.text}
								</div>
							</div>
						))}
					</div>

					<form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSendMessage}>
						<input
							type="text"
							value={inputMessage}
							onChange={(event) => setInputMessage(event.target.value)}
							placeholder="Type your legal question..."
							className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
						/>
						<button
							type="submit"
							disabled={isSendingMessage}
							className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSendingMessage ? "Sending..." : "Send"}
						</button>
					</form>
				</section>
			</div>
		</section>
	);
}
