import { NextRequest, NextResponse } from "next/server";
import { fetchWatchlist, addToWatchlist } from "../../../actions/watchlist";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  console.log(request);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    const watchlist = await fetchWatchlist(userId);
    return NextResponse.json(watchlist);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return NextResponse.json(
      { error: "خطا در بارگذاری لیست تماشا" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    const { accountId } = await request.json();
    await addToWatchlist(userId, accountId);
    return NextResponse.json({ message: "حساب به لیست تماشا اضافه شد" });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { error: "خطا در افزودن به لیست تماشا" },
      { status: 500 }
    );
  }
}
