import { type ActionArgs, json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      authorId: formData.get("authorId") as string
    }
  });

  return json({ success: true });
};
