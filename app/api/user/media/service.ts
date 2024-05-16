import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export const uploadFile = async (
  userId: string,
  formData: FormData
): Promise<string> => {
  const key: "avatar" | "backgroundCover" = formData.keys().next().value;
  if (key !== "avatar" && key !== "backgroundCover")
    throw new Error("Invalid upload");

  const file = formData.get(key) as File;
  if (!file) throw new Error("No files received");

  const buffer = Buffer.from(await file.arrayBuffer());
  const { secure_url: imageUrl } = await uploadImage(buffer);

  // @ts-ignore
  const { [key]: previousImageUrl } = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      [key]: true,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      [key]: imageUrl,
    },
  });

  if (previousImageUrl) await deleteImage(previousImageUrl);

  return imageUrl;
};
