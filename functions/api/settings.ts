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
  if (authHeader !== `Bearer ${env.ADMIN_SECRET}`) {
    return new Response('Non autorizzato', { status: 401 });
  }

  try {
    const newSettings: AppSettings = await request.json();
    await env.TIANSHI_KV.put('app_config', JSON.stringify(newSettings));
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Errore di salvataggio', { status: 500 });
  }
};