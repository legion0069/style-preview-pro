import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { photos } = await req.json();

    if (!photos || !photos.front || !photos.top || !photos.left || !photos.right || !photos.back || !photos.closeup) {
      return new Response(
        JSON.stringify({ error: "All 6 photos are required (front, top, left, right, back, closeup)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Starting hair analysis with 6 photos");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert hair analyst for a barbershop application. You will be given 6 photos of a customer's hair from different angles: front face, top view, left side, right side, back view, and a close-up texture shot. Analyze these photos carefully and use the hair_analysis function to return your findings.`,
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this customer's hair from the following 6 angles. Photo 1: Front face view." },
              { type: "image_url", image_url: { url: photos.front } },
              { type: "text", text: "Photo 2: Top/crown view." },
              { type: "image_url", image_url: { url: photos.top } },
              { type: "text", text: "Photo 3: Left side profile." },
              { type: "image_url", image_url: { url: photos.left } },
              { type: "text", text: "Photo 4: Right side profile." },
              { type: "image_url", image_url: { url: photos.right } },
              { type: "text", text: "Photo 5: Back view." },
              { type: "image_url", image_url: { url: photos.back } },
              { type: "text", text: "Photo 6: Close-up texture shot." },
              { type: "image_url", image_url: { url: photos.closeup } },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "hair_analysis",
              description: "Submit the structured hair analysis results based on the 6 customer photos.",
              parameters: {
                type: "object",
                properties: {
                  hairType: {
                    type: "string",
                    enum: ["straight", "wavy", "curly"],
                    description: "The natural hair type/pattern observed",
                  },
                  hairLength: {
                    type: "string",
                    enum: ["short", "medium", "long"],
                    description: "Current hair length",
                  },
                  hairColor: {
                    type: "string",
                    description: "Natural hair color (e.g. black, dark brown, light brown, blonde, red, grey)",
                  },
                  hairDensity: {
                    type: "string",
                    enum: ["low", "medium", "high"],
                    description: "How dense the hair is (number of strands per area). Use top view primarily.",
                  },
                  hairThickness: {
                    type: "string",
                    enum: ["thin", "medium", "thick"],
                    description: "Individual strand thickness. Use close-up photo primarily.",
                  },
                  scalpVisibility: {
                    type: "string",
                    enum: ["visible", "partially_visible", "not_visible"],
                    description: "How visible the scalp is through the hair. Use top view.",
                  },
                  hairlineCondition: {
                    type: "string",
                    enum: ["receding", "normal", "mature"],
                    description: "Hairline condition from the front view.",
                  },
                  overallScore: {
                    type: "number",
                    description: "Overall hair health/condition score from 1.0 to 5.0",
                  },
                },
                required: [
                  "hairType", "hairLength", "hairColor", "hairDensity",
                  "hairThickness", "scalpVisibility", "hairlineCondition", "overallScore",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "hair_analysis" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to analyze hair" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI analysis response received");

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "hair_analysis") {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "AI did not return structured analysis. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const analysis = JSON.parse(toolCall.function.arguments);
    console.log("Hair analysis result:", JSON.stringify(analysis));

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-hair function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
