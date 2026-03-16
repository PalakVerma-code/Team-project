import { NextResponse } from "next/server";

import { generateLegalResponse } from "@/lib/gemini";

type ChatRequestBody = {
	message?: string;
};

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ChatRequestBody;
		const message = body.message?.trim();

		if (!message) {
			return NextResponse.json({ error: "Message is required." }, { status: 400 });
		}

		const response = await generateLegalResponse(message);

		return NextResponse.json({ response });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown server error.";

		return NextResponse.json({ error: message }, { status: 500 });
	}
}
