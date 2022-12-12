import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { marked } from "marked";

export type ViewModel = {
  name: string;
  content: string;
};

export const onGet: RequestHandler = async ({ params }) => {
  const url = params.url;
  if (typeof url !== "string") {
    throw new Error("could not parse url");
  }

  const client = new PrismaClient();
  const dbPost = await client.post.findFirstOrThrow({ where: { url } });

  const { name, content } = dbPost;
  return { name, content };
};

export default component$(() => {
  const viewModelResource = useEndpoint<ViewModel>();
  return (
    <Resource
      value={viewModelResource}
      onResolved={(viewModel) => (
        <>
          <h2>{viewModel.name}</h2>
          <p dangerouslySetInnerHTML={marked.parse(viewModel.content)}></p>
        </>
      )}
    ></Resource>
  );
});
