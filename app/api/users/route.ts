import { NextRequest, NextResponse } from "next/server";
import { findUsers } from "./service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") as string;
    const limit = Number(searchParams.get("limit")) || 10;
    const categories = searchParams.get("categories") as string;
    const page = Number(searchParams.get("page")) || 0;

    const data = await findUsers(query, limit, categories, page);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:13 ⌿ GET ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
