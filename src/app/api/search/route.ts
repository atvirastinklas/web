import { docSource } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(docSource, {
  // https://docs.orama.com/open-source/supported-languages
  language: "lithuanian",
});
