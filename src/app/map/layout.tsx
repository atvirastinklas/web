import { Header } from "fumadocs-ui/layouts/home";
import { baseOptions } from "../layout.config";

interface Props {
  children: React.ReactNode;
  node: React.ReactNode;
}

export default function Layout({ children, node }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header {...baseOptions} searchToggle={{ enabled: false }} />
      <div className="pt-14 flex-grow">
        <div className="flex h-full w-full">
          {children}
          {node}
        </div>
      </div>
    </div>
  );
}
