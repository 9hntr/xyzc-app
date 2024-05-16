import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername } from "./service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username") as string;

    const user = await findUserByUsername(username);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:13 ⌿ GET ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
