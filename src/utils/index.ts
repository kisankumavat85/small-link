export const getInitials = (name: string) => {
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      initials += words[i][0].toUpperCase();
    }
  }
  return initials;
};

export const copyToClipboard = async (text: string | null) => {
  if (!text) return false;
  try {
    if ("clipboard" in navigator && text) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return document.execCommand("copy", true, text);
  } catch (error) {
    return false;
  }
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
