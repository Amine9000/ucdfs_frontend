export const dataTypeColors: {
  [k in typesColors]: { bg: string; text: string };
} = {
  string: { bg: "bg-blue-50", text: "text-blue-500" },
  number: { bg: "bg-red-50", text: "text-red-500" },
  boolean: { bg: "bg-purple-50", text: "text-purple-500" },
  date: { bg: "bg-yellow-50", text: "text-yellow-500" },
};

export enum typesColors {
  Text = "string",
  Number = "number",
  Date = "date",
  Boolean = "boolean",
}
