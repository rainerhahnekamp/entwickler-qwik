import { component$, Resource } from "@builder.io/qwik";
import { Link, RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

type ViewModel = {
  name: string;
  teaser: string;
  url: string;
};

export const onGet: RequestHandler = async () => {
  const prisma = new PrismaClient();
  const dbPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return dbPosts.map(({ name, teaser, url }) => ({ name, teaser, url }));
};

export default component$(() => {
  const viewModelResource = useEndpoint<ViewModel[]>();
  return (
    <Resource
      value={viewModelResource}
      onResolved={(viewModels) => (
        <>
          {viewModels.map((viewModel, ix) => (
            <div key={ix}>
              <h3>{viewModel.name}</h3>
              <p>{viewModel.teaser}</p>
              <Link href={`/${viewModel.url}`}>View</Link>
            </div>
          ))}
        </>
      )}
    ></Resource>
  );
});
