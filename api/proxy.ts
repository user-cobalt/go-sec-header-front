// api/proxy.ts

const handler = async (req: any, res: any) => {
  const env = process.env as any;
  const backendBase = env.GO_BACKEND_URL;
  const apiKey = env.SCANNER_API_KEY;

  // Validation
  if (!backendBase || !apiKey) {
    return res.status(500).json({ error: 'Server configuration missing: Environment variables not set.' });
  }

  const path = (req.url || '').replace(/^\/api/, '');
  const destinationUrl = `${backendBase}${path}`;

  try {
    const options: any = {
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
    
    // Copy headers if needed or just parse JSON
    const data = await backendResponse.json();
    return res.status(backendResponse.status).json(data);
    
  } catch (error: any) {
    return res.status(500).json({ error: 'Proxy failed to connect to backend', details: error.message });
  }
};

// This is the line that fixes your error
module.exports = handler;