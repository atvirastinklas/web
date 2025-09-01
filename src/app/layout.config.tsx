import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SiFacebook } from "@icons-pack/react-simple-icons";

export const baseOptions: BaseLayoutProps = {
  // TODO: Move hardcoded values to env file.
  githubUrl: "https://github.com/atvirastinklas/web",
  nav: {
    title: (
      <>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
        >
          <title>Logo</title>
          <circle cx={12} cy={12} r={12} fill="currentColor" />
        </svg>
        Atviras Kodas
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      type: "icon",
      icon: <SiFacebook />,
      label: "Facebook Grupė",
      text: "Facebook Grupė",
      url: "https://www.facebook.com/groups/1122509422249414",
    },
  ],
};
