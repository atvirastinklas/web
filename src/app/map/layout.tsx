import { Header } from "fumadocs-ui/layouts/home";
import { baseOptions } from "../layout.config";
import { SearchProvider } from "fumadocs-ui/provider";
import { lazy } from "react";

const DefaultSearchDialog = lazy(() => import("./node-search"));

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <SearchProvider SearchDialog={DefaultSearchDialog}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header
          {...baseOptions}
          searchToggle={{ enabled: true }}
          links={[
            {
              type: "main",
              text: "Žinynas",
              url: "/docs",
              on: "all",
            },
            {
              type: "main",
              text: "Privatumo Politika",
              url: "/privatumo-politika",
              on: "all",
            },
          ]}
        />
        <div className="pt-14 flex-grow overflow-hidden">
          <div className="flex h-full w-full overflow-hidden">{children}</div>
        </div>
      </div>
    </SearchProvider>
  );
}
