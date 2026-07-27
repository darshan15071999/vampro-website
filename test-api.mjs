const API_KEY = "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";

async function test() {
  console.log("Testing direct API...");
  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-405b-instruct",
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.3,
        max_tokens: 10
      })
    });
    
    console.log("Direct Status:", response.status);
    const text = await response.text();
    console.log("Direct Response:", text.substring(0, 200));
  } catch (err) {
    console.error("Direct Error:", err.message);
  }

  console.log("\nTesting corsproxy.io...");
  try {
    const response = await fetch("https://corsproxy.io/?https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-405b-instruct",
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.3,
        max_tokens: 10
      })
    });
    
    console.log("Cors Status:", response.status);
    const text = await response.text();
    console.log("Cors Response:", text.substring(0, 200));
  } catch (err) {
    console.error("Cors Error:", err.message);
  }
}

test();
