import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validations/auth.schema";
import { signup } from "./service";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validate = registerSchema.safeParse(data);

    if (!validate.success) throw new Error("Invalid parameters");

    const user = await signup(data);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    console.log("file: route.ts:27 ⌿ POST ⌿ errorMessage* ", errorMessage);

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
