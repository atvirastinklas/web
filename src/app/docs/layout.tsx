import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { MapIcon } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
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
  );
}
