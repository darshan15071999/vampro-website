const FALLBACK_MODELS = [
  "nvidia/nemotron-3.5-super-vl-120b-a12b",
  "nvidia/nemotron-3.5-lightning-30b-a3b",
  "nvidia/nemotron-3.5-bolt-e4b",
];

const RETRYABLE_STATUSES = new Set([404, 410, 429, 500, 502, 503, 504, 529]);

export async function onRequestPost(context: any) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const { request, env } = context;
    const rawBody = await request.text();
    const API_KEY = env.NVIDIA_API_KEY;

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: { message: "NVIDIA_API_KEY is not configured." } }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    let payload: Record<string, any> | null = null;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = null;
    }

    const modelsToTry = payload?.model
      ? [payload.model, ...FALLBACK_MODELS.filter((m) => m !== payload!.model)]
      : FALLBACK_MODELS;

    let lastStatus = 500;
    let lastData = JSON.stringify({ error: { message: "Failed to reach AI model." } });

    for (const model of modelsToTry) {
      const requestBody = payload
        ? JSON.stringify({
            ...payload,
            model,
            ...(model === "nvidia/nemotron-3.5-bolt-e4b"
              ? { chat_template_kwargs: undefined }
              : { chat_template_kwargs: { enable_thinking: false, ...(payload.chat_template_kwargs || {}) } }),
          })
        : rawBody;

      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: requestBody
      });

      const data = await response.text();
      lastStatus = response.status;
      lastData = data;

      if (response.ok) {
        return new Response(data, {
          status: response.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }

      if (!payload || !RETRYABLE_STATUSES.has(response.status)) {
        break;
      }
    }

    return new Response(lastData, {
      status: lastStatus,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}
