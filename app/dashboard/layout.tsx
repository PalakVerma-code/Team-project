import Link from "next/link";

const sidebarLinks = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/chat", label: "Chat" },
	{ href: "/dashboard/lawyers", label: "Lawyers" },
	{ href: "/dashboard/consultations", label: "Consultations" },
];

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-slate-100">
			<div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
				<aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:h-[calc(100vh-3rem)] lg:w-72 lg:flex-none">
					<div className="flex h-full flex-col">
						<div className="border-b border-slate-200 pb-6">
							<p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-600">
								Workspace
							</p>
							<h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
								AI Legal Sentinel
							</h2>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Manage legal intake, conversations, and consultations from one place.
							</p>
						</div>

						<nav className="mt-6 flex flex-col gap-2">
							{sidebarLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>
				</aside>

				<div className="mt-6 flex-1 lg:mt-0 lg:pl-6">
					<main className="min-h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
