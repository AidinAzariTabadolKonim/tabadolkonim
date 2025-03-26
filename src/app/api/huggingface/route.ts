// src/app/api/huggingface/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.AVALAI_API_KEY, // Add this to your .env file
  baseURL: "https://api.avalai.ir/v1", // Global URL; use api.avalapis.ir/v1 if server is in Iran
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    console.log("Received prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Start with this; swap to others like "anthropic.claude-3-5-sonnet-20240620-v1:0" if needed
      messages: [
        { role: "system", content: "You are a professional copywriter." },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const generatedText =
      completion.choices[0]?.message.content || "No response generated";
    return NextResponse.json({ generated_text: generatedText });
  } catch (error) {
    console.error("AvalAI API error:", error);
    return NextResponse.json(
      {
        error:
          "خطا در ارتباط با سرور: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
