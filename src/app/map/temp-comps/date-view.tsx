"use client";

import { intlFormat } from "date-fns";

export const DateView = ({ date }: { date: string | Date | null }) => {
  if (date == null || date === "") {
    return <>nėra</>;
  }

  return (
    <>
      {intlFormat(
        new Date(date),
        {
          dateStyle: "medium",
          timeStyle: "medium",
        },
        { locale: "lt" },
      )}
    </>
  );
};
