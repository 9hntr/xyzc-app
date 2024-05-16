import { NextResponse } from "next/server";
import { findNotifications, markAsReadNotifications } from "./service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");
    const { user } = session;

    const data = await findNotifications(user.id);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:16 ⌿ GET ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");
    const { user } = session;

    await markAsReadNotifications(user.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:37 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
