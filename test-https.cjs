const https = require('https');

const data = JSON.stringify({
  model: "meta/llama-3.1-405b-instruct",
  messages: [{ role: "user", content: "Hello" }],
  temperature: 0.3,
  max_tokens: 10
});

const options = {
  hostname: 'integrate.api.nvidia.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log('statusCode:', res.statusCode);
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => console.log('Response:', body));
});

req.on('error', error => { console.error(error); });
req.write(data);
req.end();
