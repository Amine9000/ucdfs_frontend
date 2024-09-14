export const dataTypeColors: {
  [k in typesColors]: { bg: string; text: string };
} = {
  text: { bg: "bg-blue-50", text: "text-blue-500" },
  number: { bg: "bg-red-50", text: "text-red-500" },
  boolean: { bg: "bg-purple-50", text: "text-purple-500" },
  date: { bg: "bg-yellow-50", text: "text-yellow-500" },
  textarea: { bg: "bg-green-50", text: "text-green-500" },
};

export enum typesColors {
  text = "text",
  Nombre = "number",
  Date = "date",
  Boolean = "boolean",
  textarea = "textarea",
}
