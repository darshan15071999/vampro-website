const API_KEY = "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";

async function test() {
  const response = await fetch("https://integrate.api.nvidia.com/v1/models", {
    headers: { "Authorization": `Bearer ${API_KEY}` }
  });
  const data = await response.json();
  const models = data.data.map(m => m.id).filter(id => id.includes("llama-3.1"));
  console.log("Matching models:", models);
}
test();
