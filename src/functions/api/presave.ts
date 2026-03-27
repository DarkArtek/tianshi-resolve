export interface Env {
    tianshi_presaves: D1Database;
}

interface PresaveRequest {
    email?: string;
}

export const onRequestPost = async (context: { request: Request, env: Env }) => {
    try {
        const body = (await context.request.json()) as PresaveRequest;
        const email = body.email;

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: "Email non valida" }), { status: 400 });
        }

        const { success, error } = await context.env.tianshi_presaves.prepare(
            "INSERT INTO presaves (email, created_at) VALUES (?, ?)"
        ).bind(email, new Date().toISOString()).run();

        if (!success) {
            console.error("Errore D1:", error);
            return new Response(JSON.stringify({ error: "Errore nel salvataggio o email già registrata" }), { status: 400 });
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: "Errore interno o email già registrata" }), { status: 500 });
    }
};