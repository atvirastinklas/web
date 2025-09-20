import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { lazy, type ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { docSource } from "@/lib/source";
import { MapIcon } from "lucide-react";
import { SearchProvider } from "fumadocs-ui/provider";
import Link from "next/link";

const DefaultSearchDialog = lazy(
  () => import("fumadocs-ui/components/dialog/search-default"),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider SearchDialog={DefaultSearchDialog}>
      <DocsLayout
        tree={docSource.pageTree}
        {...baseOptions}
        sidebar={{
          footer: (
            <div className="px-2 py-2 text-sm text-fd-muted-foreground border-t border-t-border mt-2">
              <Link href="/privatumo-politika">Privatumo Politika</Link>
            </div>
          ),
        }}
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
