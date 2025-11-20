const normalizeDate = (dateInput: string | Date): Date => {
  return typeof dateInput === "string" ? new Date(dateInput) : dateInput;
};

export const formatDate = (dateInput: string | Date): string => {
  const date = normalizeDate(dateInput);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatTime = (dateInput: string | Date): string => {
  const date = normalizeDate(dateInput);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDay = (dateInput: string | Date): string => {
  const date = normalizeDate(dateInput);
  return date.toLocaleString("en-US", { weekday: "long" });
};

export const formatDayShort = (dateInput: string | Date): string => {
  const date = normalizeDate(dateInput);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const formatMonth = (dateInput: string | Date): string => {
  const date = normalizeDate(dateInput);
  return date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
};

export const getDay = (dateInput: string | Date): number => {
  const date = normalizeDate(dateInput);
  return date.getDate();
};
