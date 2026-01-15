import { ListModel, ListModelSelect } from "@/models/ListModel";

export const base64ToFile = (base64String: string, fileName: string): File => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png"; // Extract MIME type
    const bstr = atob(arr[1]); // Decode Base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};
  

export const formatTimestampDate = (timestamp: string | undefined) => {
  if (!timestamp) return;
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleString("fr-FR", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Automatically uses user's local timezone
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTimestampChat = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();

  if (date) {
    const isToday = date.toDateString() === now.toDateString();
    const isThisYear = date.getFullYear() === now.getFullYear();
  
    if (isToday) {
      // If it's today, show hour & minute
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isThisYear) {
      // If it's this year but not today, show dd/mm
      return date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
      });
    } else {
      // If it's from a previous year, show the year
      return date.getFullYear().toString();
    }
  } else {
    return 'now'
  }

};


export const formatListWithIndifferent = (list: ListModelSelect[]) => {
  return [
    { value: "blank", label: "indifférent" },
    ...list.map(item => ({
      value: String(item.id),
      label: item.title,
    })),
  ];
};

export const formatListWithDecouvrire = (list: ListModelSelect[]) => {
  return [
    ...list.map(item => ({
      value: String(item.id),
      label: item.title,
    })),
    { value: "blank", label: "à vous de le découvrir" },
  ];
};

export const prependIndifferentRaw = (list: ListModel[]) => [
  { id: "blank", title: "indifférent" },
  ...list,
];