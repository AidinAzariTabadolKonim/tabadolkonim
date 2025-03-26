import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";

import { databases, AppwriteQuery as Query } from "@lib/appwrite";
export const runtime = "edge";

// Validate API key at startup
if (!process.env.AVALAI_API_KEY) {
  throw new Error("AVALAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.AVALAI_API_KEY,
  baseURL: "https://api.avalai.ir/v1",
});

export async function POST(request: Request) {
  // Check if the user is authenticated
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "برای دسترسی به این سرویس باید وارد شوید" },
      { status: 401 }
    );
  }

  const databaseId = "67c0659400092309e435"; // Replace with your database ID
  const collectionId = "67e473dc00267a1ab5a3"; // The collection you created

  try {
    // Fetch the user's API call data
    const userDocs = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("clerkUserId", userId),
    ]);

    if (userDocs.documents.length === 0) {
      return NextResponse.json(
        { error: "داده‌های کاربر یافت نشد" },
        { status: 404 }
      );
    }

    const userDoc = userDocs.documents[0];

    // Check the daily limit
    if (userDoc.dailyCount >= 3) {
      return NextResponse.json(
        {
          error:
            "شما به حداکثر تعداد درخواست روزانه (3) رسیده‌اید. لطفاً فردا برای 3 تلاش رایگان خود بازگردید.",
        },
        { status: 429 } // Too Many Requests
      );
    }

    // Proceed with the AI API call
    const { prompt } = await request.json();

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "پرامپت معتبر ارائه نشده است" },
        { status: 400 }
      );
    }

    console.log("Received prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional copywriter." },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const generatedText =
      completion.choices[0]?.message.content || "هیچ پاسخی تولید نشد";

    // Increment the counts
    await databases.updateDocument(databaseId, collectionId, userDoc.$id, {
      lifetimeCount: userDoc.lifetimeCount + 1,
      dailyCount: userDoc.dailyCount + 1,
    });

    return NextResponse.json({ generated_text: generatedText });
  } catch (error) {
    console.error("AvalAI API error:", error);
    return NextResponse.json(
      {
        error:
          "خطا در ارتباط با سرور: " +
          (error instanceof Error ? error.message : "خطای ناشناخته"),
      },
      { status: 500 }
    );
  }
}
