import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DisplayQRCode = ({
  imageUrl,
  userLink,
}: {
  imageUrl: string;
  userLink: string;
}) => {
  const hdlDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${userLink}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-left text-lg font-semibold">Your QR Code</h2>
      <p className="text-semibold mb-4 text-left text-xs">{userLink}</p>
      <Image width={200} height={200} src={imageUrl} alt="qrcode" />
      <Button
        className="mt-2 w-full text-xs"
        variant="default"
        onClick={hdlDownload}
      >
        <Download className="mr-2 inline-block h-4 w-4" />
        Download as PNG
      </Button>
    </div>
  );
};
