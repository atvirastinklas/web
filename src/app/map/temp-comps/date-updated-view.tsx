"use client";

import { intlFormat, intlFormatDistance } from "date-fns";

export const DateUpdatedView = (props: { date: Date | string | null }) => {
  if (props.date == null) {
    return <>-</>;
  }

  const date =
    typeof props.date === "string" ? new Date(props.date) : props.date;

  return (
    <span
      title={intlFormat(
        date,
        {
          dateStyle: "medium",
          timeStyle: "medium",
        },
        { locale: "lt" },
      )}
    >
      {intlFormatDistance(date, new Date(), {
        locale: "lt",
        style: "long",
        numeric: "always",
      })}
    </span>
  );
};
