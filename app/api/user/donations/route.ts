import { NextRequest, NextResponse } from "next/server";
import { makeDonation, getDonations } from "./service";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { targetId, amount, message = "", name = "" } = data;

    if (isNaN(amount)) throw new Error("Invalid amount");

    const newDonation = await makeDonation({
      targetId,
      amount: Number(amount),
      message,
      name,
    });

    return NextResponse.json({ newDonation }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:42 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get("username") ?? "";
    const skipDonations = Number(searchParams.get("skipDonations")) ?? 0;

    const { donations, countDonations } = await getDonations(
      username,
      skipDonations
    );

    return NextResponse.json({ donations, countDonations }, { status: 200 });
  } catch (error) {
    console.log("file: route.ts:47 ⌿ POST ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
