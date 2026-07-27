const API_KEY = "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";
const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

async function test() {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 512,
    })
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
