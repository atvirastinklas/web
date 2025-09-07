"use client";

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from "fumadocs-ui/components/dialog/search";
import type { SharedProps } from "fumadocs-ui/contexts/search";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import useSwr from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

interface Props extends SharedProps {}

export default function NodeSearch(props: Props) {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 500);
  const { data, isLoading } = useSwr(
    `https://api.atvirastinklas.lt/node/search?q=${debouncedFilter}`,
    fetcher,
    {
      revalidateOnFocus: false,
      isPaused: () => debouncedFilter.trim().length === 0,
    },
  );

  const searchResults: Array<{
    nodeNum: number;
    nodeId: string;
    longName: string;
    shortName: string;
  }> = data || [];

  return (
    <SearchDialog
      search={filter}
      onSearchChange={(value) => setFilter(value)}
      isLoading={isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={
            isLoading
              ? null
              : searchResults.map((node) => ({
                  id: node.nodeId,
                  content: `${node.shortName} (${node.longName})`,
                  url: `/map?node=${node.nodeNum}`,
                  type: "text" as const,
                }))
          }
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
