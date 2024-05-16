import QRCode from "qrcode";

export const generateQR = async (text: string) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error("file: qrcode.ts:7 ⌿ generateQR ⌿ err* ", err);
  }
};
