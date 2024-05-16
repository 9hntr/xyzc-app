import { NextRequest, NextResponse } from "next/server";
import { followUser, getFollowing } from "./service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");
    const { user } = session;

    const data = await req.json();
    const { followingId } = data;

    const { success } = await followUser({
      followerId: user.id,
      followingId,
    });

    return NextResponse.json({ success }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:23 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user)
      return NextResponse.json({ following: [] }, { status: 200 });

    const { user } = session;

    const following = await getFollowing({
      userId: user.id,
    });

    return NextResponse.json({ following }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:23 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
