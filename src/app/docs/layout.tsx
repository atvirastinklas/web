import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { lazy, type ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { MapIcon } from "lucide-react";
import { SearchProvider } from "fumadocs-ui/provider";

const DefaultSearchDialog = lazy(
  () => import("fumadocs-ui/components/dialog/search-default"),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider SearchDialog={DefaultSearchDialog}>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        links={[
          ...baseOptions.links,
          {
            type: "main",
            text: "Žemėlapis",
            url: "/map",
            icon: <MapIcon />,
            on: "menu",
          },
        ]}
      >
        {children}
      </DocsLayout>
    </SearchProvider>
  );
}
