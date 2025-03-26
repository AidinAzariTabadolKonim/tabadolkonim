// src/app/api/getApiCallData/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const runtime = "edge";

import { databases, AppwriteQuery as Query } from "@lib/appwrite";

export async function GET(request: Request) {
  console.log(request);
  // Check if the user is authenticated
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "برای دسترسی به این سرویس باید وارد شوید" },
      { status: 401 }
    );
  }

  const databaseId = "67c0659400092309e435"; // Same as in checkApiLimit
  const collectionId = "67e473dc00267a1ab5a3"; // Same as in checkApiLimit

  try {
    // Fetch the user's document
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

    return NextResponse.json(
      {
        dailyCount: userDoc.dailyCount,
        lifetimeCount: userDoc.lifetimeCount,
        remainingTries: Math.max(0, 3 - userDoc.dailyCount),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getApiCallData:", error);
    return NextResponse.json(
      {
        error:
          "خطا در دریافت داده‌های درخواست: " +
          (error instanceof Error ? error.message : "خطای ناشناخته"),
      },
      { status: 500 }
    );
  }
}
