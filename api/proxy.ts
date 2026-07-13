export default async function handler(req: any, res: any) {
  const env = process.env as any;
  const backendBase = env.GO_BACKEND_URL;
  const apiKey = env.SCANNER_API_KEY;

  console.log('--- Proxy Debug ---');
  console.log('Backend Base:', backendBase ? 'Set' : 'MISSING');
  console.log('API Key:', apiKey ? 'Set' : 'MISSING');

  if (!backendBase || !apiKey) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  const path = (req.url || '').replace(/^\/api/, '');
  const destinationUrl = `${backendBase}${path}`;
  console.log('Target URL:', destinationUrl);

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
    
    // Log the status in case the backend is the one rejecting us
    console.log('Backend Status:', backendResponse.status);
    
    const data = await backendResponse.json();
    return res.status(backendResponse.status).json(data);
    
  } catch (error: any) {
    console.error('Proxy Error:', error.message);
    return res.status(500).json({ error: 'Proxy failed to connect to backend', details: error.message });
  }
}