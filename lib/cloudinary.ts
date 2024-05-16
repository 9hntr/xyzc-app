import { siteConfig } from "@/siteConfig";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import path from "path";

cloudinary.config({
  secure: true,
  cloud_name: siteConfig.storage.cloudinary.cloudName,
  api_key: siteConfig.storage.cloudinary.apiKey,
  api_secret: siteConfig.storage.cloudinary.apiSecret,
});

export const uploadImage = async (
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {},
      // @ts-ignore
      (error: Error, result: UploadApiResponse) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const deleteImage = async (url: string): Promise<void> => {
  const dImage = path.basename(url)!.split(".")[0];
  await cloudinary.api.delete_resources([dImage], {
    type: "upload",
    resource_type: "image",
  });
};
