import { NextRequest, NextResponse } from "next/server";
import { deleteFromWatchlist } from "../../../../actions/watchlist";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  try {
    await deleteFromWatchlist(params.id);
    return NextResponse.json({ message: "حساب از لیست تماشا حذف شد" });
  } catch (error) {
    console.error("Error deleting from watchlist:", error);
    return NextResponse.json(
      { error: "خطا در حذف از لیست تماشا" },
      { status: 500 }
    );
  }
}
