"use client";

import { Link, QrCode, SquareArrowOutUpRight } from "lucide-react";
import { Fragment, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { siteConfig } from "@/siteConfig";
import { User } from "@/types";
import { X } from "@/app/Components/icons/X";
import { Facebook } from "@/app/Components/icons/Facebook";
import { generateQR } from "@/lib/qrcode";
import { DisplayQRCode } from "./DisplayQRCode";

export const BtnShare = ({ user }: { user: User }) => {
  const userLink = siteConfig.domain + user?.username;
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [qrCodeImageUrl, setQRCodeImageUrl] = useState<string>("");

  const setDefaultValues = () => {
    setLinkCopied(false);
    setQRCodeImageUrl("");
  };

  const hdlShareX = () => {
    const tweetText = encodeURIComponent(
      `${user?.about} 🎉\n\nYou can support by buying a coffee ☕ here —\n${siteConfig.domain}${user?.username}`
    );

    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    if (window)
      window.open(
        tweetUrl,
        "targetWindow",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
  };

  const hdlShareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${siteConfig.domain}${user?.username}`;

    if (window)
      window.open(
        shareUrl,
        "targetWindow",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
  };

  const hdlCopyLink = () => {
    navigator.clipboard.writeText(userLink);
    setLinkCopied(true);
  };

  const hdlGetQrCode = async () => {
    const imageUrl = await generateQR(userLink);
    if (imageUrl) setQRCodeImageUrl(imageUrl);
  };

  return (
    <Popover onOpenChange={() => setDefaultValues()}>
      <PopoverTrigger asChild>
        <button className="absolute right-4 top-4 p-2">
          <SquareArrowOutUpRight className="h-4 w-4 text-xs text-muted-foreground transition duration-150 hover:text-primary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex w-64 flex-col items-center justify-center p-2">
        {qrCodeImageUrl ? (
          <DisplayQRCode imageUrl={qrCodeImageUrl} userLink={userLink} />
        ) : (
          <Fragment>
            <h2 className="text-lg font-semibold">Share link to this page</h2>
            <div className="mt-2 flex w-full cursor-pointer flex-wrap items-center justify-center gap-x-2 rounded-md">
              <span
                onClick={hdlShareFacebook}
                className="flex w-12 flex-col items-center"
              >
                <div className="rounded-lg border p-2">
                  <Facebook className="h-4 w-4 text-primary dark:text-secondary" />
                </div>
                <span className="bold-semibold mt-1 text-xs text-muted-foreground">
                  Facebook
                </span>
              </span>
              <span
                onClick={hdlShareX}
                className="flex w-12 flex-col items-center"
              >
                <div className="rounded-lg border p-2">
                  <X className="h-4 w-4 text-primary" />
                </div>
                <span className="bold-semibold mt-1 text-xs text-muted-foreground">
                  X
                </span>
              </span>
              <span
                onClick={hdlCopyLink}
                className="flex w-12 flex-col items-center"
              >
                <div className="rounded-lg border p-2">
                  <Link className="h-4 w-4 text-primary" />
                </div>
                <span className="bold-semibold mt-1 text-xs text-muted-foreground">
                  {linkCopied ? "Copied!" : "Copy"}
                </span>
              </span>

              <span
                onClick={hdlGetQrCode}
                className="flex w-12 flex-col items-center"
              >
                <div className="rounded-lg border p-2">
                  <QrCode className="h-4 w-4 text-primary" />
                </div>
                <span className="bold-semibold mt-1 text-xs text-muted-foreground">
                  QRCode
                </span>
              </span>
            </div>
          </Fragment>
        )}
      </PopoverContent>
    </Popover>
  );
};
