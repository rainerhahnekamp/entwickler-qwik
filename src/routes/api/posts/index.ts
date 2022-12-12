import { RequestHandler } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const addPostSchema = z.object({
  name: z.string(),
  teaser: z.string(),
  url: z.string(),
  content: z.string(),
});

export const onGet: RequestHandler = async () => {
  const prisma = new PrismaClient();
  const dbPosts = await prisma.post.findMany();
  return dbPosts.map(({ id, name, teaser, url, content }) => ({
    id,
    name,
    teaser,
    url,
    content,
  }));
};

export const onPost: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const addPost = addPostSchema.parse(body);
  const prisma = new PrismaClient();
  await prisma.post.create({ data: addPost });
};
