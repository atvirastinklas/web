"use client";

import { MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const GoToMapButton = (props: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("viewMode", "map");
        replace(`?${params.toString()}`);
      }}
      className={cn("lg:hidden", props.className)}
    >
      <MapIcon />
    </Button>
  );
};
