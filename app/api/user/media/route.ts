import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";
import { uploadFile } from "./service";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");

    const { user } = session;

    const formData = await req.formData();

    const url = await uploadFile(user.id, formData);

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.log("file: route.ts:47 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
