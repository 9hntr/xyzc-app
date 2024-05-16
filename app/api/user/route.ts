import { NextRequest, NextResponse } from "next/server";
import { findUser, updateUser, deleteUser } from "./service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";
import { updateUserSchema } from "@/validations/api/user.schema";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");

    const { user } = session;

    await deleteUser(user.id);

    return NextResponse.json({ deleted: true }, { status: 201 });
  } catch (error) {
    console.log("file: route.ts:17 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");

    const {
      user: { id: userId },
    } = session;

    const data = await req.json();

    const validation = updateUserSchema.safeParse(data);
    if (!validation.success) throw new Error("Invalid parameters");

    const user = await updateUser(userId, data);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log("file: route.ts:77 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) throw new Error("Unauthenticated");

    const {
      user: { id: userId },
    } = session;

    const user = await findUser(userId);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:17 ⌿ GET ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
