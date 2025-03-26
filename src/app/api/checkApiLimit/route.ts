// src/app/api/checkApiLimit/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const runtime = "edge";

import { databases, AppwriteQuery as Query, AppwriteID } from "@lib/appwrite";

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

  const databaseId = "67c0659400092309e435"; // Replace with your database ID
  const collectionId = "67e473dc00267a1ab5a3"; // The collection you created

  try {
    // Get the current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]; // e.g., "2025-03-26"

    // Check if a document exists for this user
    const userDocs = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("clerkUserId", userId),
    ]);

    let userDoc;
    if (userDocs.documents.length === 0) {
      // Create a new document for the user
      userDoc = await databases.createDocument(
        databaseId,
        collectionId,
        AppwriteID.unique(), // Generate a unique document ID
        {
          clerkUserId: userId,
          lifetimeCount: 0,
          dailyCount: 0,
          lastResetDate: today,
        }
      );
    } else {
      userDoc = userDocs.documents[0];
    }

    // Check if the daily count needs to be reset
    if (userDoc.lastResetDate !== today) {
      userDoc = await databases.updateDocument(
        databaseId,
        collectionId,
        userDoc.$id,
        {
          dailyCount: 0,
          lastResetDate: today,
        }
      );
    }

    // Calculate remaining tries (daily limit is 3)
    const remainingTries = Math.max(0, 3 - userDoc.dailyCount);

    return NextResponse.json(
      {
        remainingTries,
        dailyCount: userDoc.dailyCount,
        lifetimeCount: userDoc.lifetimeCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in checkApiLimit:", error);
    return NextResponse.json(
      {
        error:
          "خطا در بررسی محدودیت درخواست: " +
          (error instanceof Error ? error.message : "خطای ناشناخته"),
      },
      { status: 500 }
    );
  }
}
