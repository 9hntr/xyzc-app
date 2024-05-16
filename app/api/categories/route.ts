import { NextRequest, NextResponse } from "next/server";
import { getCategories } from "./service";

export async function GET(req: NextRequest) {
  try {
    const categories = await getCategories();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:10 ⌿ GET ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
