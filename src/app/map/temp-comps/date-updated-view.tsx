"use client";

import { intlFormat, intlFormatDistance } from "date-fns";

export const DateUpdatedView = (props: { date: Date | null }) => {
  if (props.date == null) {
    return <>-</>;
  }

  return (
    <span
      title={intlFormat(
        props.date,
        {
          dateStyle: "medium",
          timeStyle: "medium",
        },
        { locale: "lt" },
      )}
    >
      {intlFormatDistance(props.date, new Date(), {
        locale: "lt",
        style: "long",
        numeric: "always",
      })}
    </span>
  );
};
