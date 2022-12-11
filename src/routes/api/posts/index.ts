import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async () => {
  return { value: "Hallo von Qwik" };
};
