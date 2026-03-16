import { supabase } from "@/lib/supabase";

export type UserProfile = {
	id: string;
	email: string;
	name: string | null;
	role: string;
};

export async function signUp(email: string, password: string) {
	return supabase.auth.signUp({ email, password });
}

export async function syncUserProfile(userId: string, email: string, username: string) {
	return fetch("/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userId, email, username }),
	});
}

export async function signIn(email: string, password: string) {
	return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
	return supabase.auth.signOut();
}

export async function getCurrentUser() {
	return supabase.auth.getUser();
}

export async function getCurrentUserProfile() {
	const {
		data: { user },
		error: userError,
	} = await getCurrentUser();

	if (userError || !user) {
		return { data: null, error: userError };
	}

	const profileResult = await supabase
		.from("users")
		.select("id, email, name, role")
		.eq("id", user.id)
		.single<UserProfile>();

	return profileResult;
}
