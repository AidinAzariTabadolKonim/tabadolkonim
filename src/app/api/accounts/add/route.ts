import { NextRequest, NextResponse } from "next/server";
import { addAccount } from "../../../../actions/accounts";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const isAdmin =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ===
      user?.emailAddresses[0].emailAddress;
    await addAccount(data, userId, isAdmin);
    return NextResponse.json({ message: "حساب با موفقیت اضافه شد" });
  } catch (error) {
    console.error("Error adding account:", error);
    const message =
      error instanceof Error ? error.message : "خطا در افزودن حساب";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
