// Define expected structure
interface ProcessEnv {
  [key: string]: string | undefined;
}

// Access environment variables without hardcoding them
const env = process.env as any;

export default async function handler(req: any, res: any) {
  const backendBase = env.GO_BACKEND_URL;
  const apiKey = env.SCANNER_API_KEY;

  // FAIL FAST: If these aren't set in the Vercel Dashboard, 
  // the code crashes immediately rather than leaking a dummy key.
  if (!backendBase || !apiKey) {
    return res.status(500).json({ error: 'Server configuration missing: Environment variables not set.' });
  }

  const path = (req.url || '').replace(/^\/api/, '');
  const destinationUrl = `${backendBase}${path}`;

  try {
    const options: RequestInit = {
      method: req.method,
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const backendResponse = await fetch(destinationUrl, options);
    const data = await backendResponse.json();

    return res.status(backendResponse.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to securely connect to Go backend.' });
  }
}