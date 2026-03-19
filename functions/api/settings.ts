interface Env {
  TIANSHI_KV: KVNamespace;
  ADMIN_SECRET: string;
}

interface AppSettings {
  previewLimitActive: boolean;
  storeLinks: {
    spotify: string;
    appleMusic: string;
    deezer: string;
    youtube: string;
    amazonMusic: string;
  };
}

const DEFAULT_SETTINGS: AppSettings = {
  previewLimitActive: false,
  storeLinks: {
    spotify: '',
    appleMusic: '',
    deezer: '',
    youtube: '',
    amazonMusic: ''
  }
};

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

export const onRequestPost = async (context: { request: Request, env: Env }) => {
  const { request, env } = context;
  
  const authHeader = request.headers.get('Authorization');
  
  // TRUCCO: Se Cloudflare non passa la variabile, usiamo una password di fallback fissa
  const secret = env.ADMIN_SECRET || "tianshi2026";

  if (authHeader !== `Bearer ${secret}`) {
    return new Response(JSON.stringify({ 
      error: "Non autorizzato",
      dettaglio: !env.ADMIN_SECRET ? "La variabile ADMIN_SECRET su Cloudflare è vuota o non letta. Fallback attivo." : "Password errata."
    }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const newSettings: AppSettings = await request.json();
    
    // Controllo di sicurezza sul KV
    if (!env.TIANSHI_KV) {
      return new Response(JSON.stringify({ error: "Il database KV non è collegato al server!" }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    await env.TIANSHI_KV.put('app_config', JSON.stringify(newSettings));
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Errore di salvataggio interno" }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};