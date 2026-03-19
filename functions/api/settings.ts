// Tipi per l'ambiente Cloudflare
interface Env {
    TIANSHI_KV: KVNamespace;
    ADMIN_SECRET: string; // da impostare la password via CF Dashboard
}

// Interfaccia per i nostri dati
interface AppSettings {
    previewLinkActive: boolean;
    storeLinks: {
        spotify: string;
        appleMusic: string;
        youtube: string;
        deezer: string;
        amazonMusic: string;
    }
};

const DEFAULT_SETTINGS: AppSettings = {
    previewLimitActive: false,
    storeLinks: {
        spotify: 'https://spotify.com/...',
        appleMusic: 'https://music.apple.com/...',
        youtube: 'https://youtube.com/...',
        deezer: 'https://deezer.com/...',
        amazonMusic: 'https://music.amazon.com/...'
    }
}

// GET: il frontend di Vue chiama questa funzione per leggere le impostazioni
export const onRequestGet = async (context: { env: Env }) => {
    try {
        const rawData = await context.env.TIANSHI_KV.get('app_config');
        const settings = rawData ? JSON.parse(rawData) : DEFAULT_SETTINGS;

        return new Response(JSON.stringify(settings), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify(DEFAULT_SETTINGS), { status: 200 });
    }
};

// POST: Il pannello admin chiama questa per salvare le modifiche
export const onRequestPost = async (context: { request: Request, env: Env }) => {
    const { request, env } = context;

    // Controllo di sicurezza basilare
    const authHeader = request.headers.get('Authorization');
    if (authHeader != `Bearer ${env.ADMIN_SECRET}` ) {
        return new Response('Non Autorizzato', { status: 401 });
    }

    // Lettura e salvataggio dati nel KV
    try {
        const newSettings: AppSettings = await request.json();
        await env.TIANSHI_KV.put('app_config', JSON.stringify(newSettings));

        return new Response(JSON.stringify({ success: true }), {
            headers: {'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Errore di salvataggio', { status: 500 });
    }
}

