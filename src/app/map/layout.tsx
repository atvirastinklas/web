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
      <div className="flex flex-col min-h-screen">
        <Header {...baseOptions} searchToggle={{ enabled: true }} />
        <div className="pt-14 flex-grow">
          <div className="flex h-full w-full">{children}</div>
        </div>
      </div>
    </SearchProvider>
  );
}
