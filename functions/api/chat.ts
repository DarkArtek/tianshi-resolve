interface Env {
    GEMINI_API_KEY: string
}

export const onRequestPost = async (context: { request: Request, env: Env}) => {
    try {
        const {prompt} = await context.request.json();
        const apiKey = context.env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API KEY MANCANTE"}), {status: 500});
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{parts: [{ text: prompt}]}]
            })
        });

        if (!response.ok) {
            return new Response(JSON.stringify({error: "Errore Gemini"}), {status: response.status});
        }

        const data = await.response.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json'}
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "errore del server"}), { status: 500 });
    }
};