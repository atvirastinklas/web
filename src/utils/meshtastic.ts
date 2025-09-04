export const nodeNumToId = (num: number) =>
  `!${num.toString(16).padStart(8, "0")}`;

export const nodeIdToNum = (id: string) =>
  Number.parseInt(id.replace(/^!/, ""), 16);
