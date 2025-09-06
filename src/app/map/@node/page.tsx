import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CpuIcon,
  KeyIcon,
  MapPinIcon,
  MessageCircleOff,
  UserIcon,
  XIcon,
} from "lucide-react";
import type { MeshNode } from "../contracts";
import { intlFormat } from "date-fns";
import Link from "next/link";

export const dynamic = "force-dynamic";

const formatAccuracy = (accuracy: number) => {
  return `${Math.round(accuracy)}m`;
};

interface Props {
  searchParams: Promise<{ node?: string }>;
}

export default async function Page(props: Props) {
  const { node } = await props.searchParams;

  if (node == null) {
    return null;
  }

  return (
    <div className="min-w-screen sm:min-w-full lg:min-w-lg h-full bg-card border-l border-border p-6 overflow-y-auto relative">
      <div className="absolute top-2 right-2">
        <Button type="button" variant="ghost" asChild>
          <Link href="/map" replace={true}>
            <XIcon />
          </Link>
        </Button>
      </div>
      {node}
    </div>
  );
}
