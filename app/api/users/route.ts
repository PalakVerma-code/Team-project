import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Service role client — never exposed to the browser, bypasses RLS safely
const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
	const { data, error } = await supabaseAdmin.from("users").select("*");

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}

export async function POST(request: Request) {
	const body = (await request.json()) as {
		userId?: string;
		email?: string;
		username?: string;
	};

	if (!body.userId || !body.email || !body.username?.trim()) {
		return NextResponse.json(
			{ error: "Invalid payload. userId, email, and username are required." },
			{ status: 400 },
		);
	}

	const { error } = await supabaseAdmin.from("users").upsert(
		{
			id: body.userId,
			email: body.email,
			name: body.username.trim(),
			role: "user",
		},
		{ onConflict: "id", ignoreDuplicates: false },
	);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}
