type ButtonIds = "load" | "logs" | "save" | "send";
type optionIds = "author" | "color" | "fieldAdd" | "fieldRemove" | "title" | "description" | "footer" | "thumbnail" | "content";
declare const isOption: (x: any) => x is optionIds;
declare const isButton: (x: any) => x is ButtonIds;
export { ButtonIds, isButton, optionIds, isOption };
