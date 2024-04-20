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
