import { NextRequest, NextResponse } from "next/server";
import { databases, DATABASE_ID, ACCOUNTS_COLLECTION_ID } from "@lib/appwrite";
import { auth } from "@clerk/nextjs/server";
import { deleteAccount } from "actions/accounts";

// Define the params interface
interface Params {
  id: string;
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    const { id } = await context.params; // Await the params Promise
    const data = await request.json();
    console.log("Updating account:", id, "with data:", data); // Debug log

    // Ensure only allowed fields are updated
    const updateData = {
      username: data.username,
      link: data.link,
      category: data.category,
      wouldLikeBack: data.wouldLikeBack,
      wouldShareBack: data.wouldShareBack,
      wouldFollowBack: data.wouldFollowBack,
      wouldCommentBack: data.wouldCommentBack,
      hasSupportGroup: data.hasSupportGroup,
      hasInstagramMarketingBusiness: data.hasInstagramMarketingBusiness,
    };

    const updatedDoc = await databases.updateDocument(
      DATABASE_ID,
      ACCOUNTS_COLLECTION_ID,
      id,
      updateData
    );
    console.log("Update successful:", updatedDoc); // Debug log
    return NextResponse.json({ message: "حساب به‌روزرسانی شد" });
  } catch (error) {
    console.error("Error in PUT /api/accounts/[id]:", error);
    const message =
      error instanceof Error ? error.message : "خطا در به‌روزرسانی حساب";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    const { id } = await context.params; // Await the params Promise
    await deleteAccount(id);
    return NextResponse.json({ message: "حساب با موفقیت حذف شد" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ error: "خطا در حذف حساب" }, { status: 500 });
  }
}
