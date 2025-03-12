import { NextRequest, NextResponse } from "next/server";
import { deleteFromWatchlist } from "../../../../actions/watchlist";
import { auth } from "@clerk/nextjs/server";

// Define the params interface
interface Params {
  id: string;
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
    await deleteFromWatchlist(id);
    return NextResponse.json({ message: "حساب از لیست تماشا حذف شد" });
  } catch (error) {
    console.error("Error deleting from watchlist:", error);
    return NextResponse.json(
      { error: "خطا در حذف از لیست تماشا" },
      { status: 500 }
    );
  }
}
