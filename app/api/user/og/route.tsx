import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { findUserAvatar } from "./service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username") as string;
    const { avatar } = await findUserAvatar(username);

    // todo: make sure every image is a png/jpg/jpeg, otherwise it will not be rendered...

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "white",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 6em",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "100%",
            }}
          >
            {avatar && (
              <img
                alt={username}
                height={200}
                width={200}
                src={avatar}
                style={{
                  borderRadius: "100%",
                }}
              />
            )}
          </div>
          <div
            style={{
              fontSize: 65,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "#0F0F0F",
              padding: "0 0 0 60px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            Support me on Xyzc ❤️
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.log("file: route.tsx:65 ⌿ GET ⌿ error* ", error);

    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
