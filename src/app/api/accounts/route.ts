import { NextRequest, NextResponse } from "next/server";
import { fetchAllAccounts } from "../../../actions/accounts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const accounts = await fetchAllAccounts();
    if (userId) {
      const userAccounts = accounts.filter(
        (account) => account.userId === userId
      );
      return NextResponse.json(userAccounts);
    }
    return NextResponse.json(accounts); // Default: all accounts
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { error: "خطا در بارگذاری حساب‌ها" },
      { status: 500 }
    );
  }
}
