import { NextRequest, NextResponse } from "next/server";
import { rateAccount } from "../../../../actions/accounts";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    const { accountId, stars } = await request.json();
    await rateAccount(accountId, userId, stars);
    return NextResponse.json({ message: "امتیاز با موفقیت ثبت شد" });
  } catch (error) {
    console.error("Error rating account:", error);
    return NextResponse.json({ error: "خطا در ثبت امتیاز" }, { status: 500 });
  }
}
