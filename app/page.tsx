import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_right,#bfdbfe,transparent_30%),linear-gradient(135deg,#eff6ff_0%,#f8fafc_50%,#ffffff_100%)] px-6 py-20 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full gap-10 rounded-4xl border border-white/70 bg-white/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
              AI Legal Sentinel
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Legal guidance, triage, and support in one secure workflow.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                AI Legal Sentinel helps users start legal conversations faster,
                surface relevant issues early, and move smoothly from AI-assisted
                intake to lawyer discovery.
              </p>
            </div>

            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-base font-medium text-white transition hover:bg-slate-800"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300/40">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                  Platform Overview
                </p>
                <h2 className="text-2xl font-semibold">Built for fast legal intake</h2>
              </div>

              <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Start AI-led chats to capture facts and legal context.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Organize case signals before escalation to counsel.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Connect users with the right lawyer when needed.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
