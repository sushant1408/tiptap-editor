export const countWords = (text: string) => {
  if (text.trim().length === 0) {
    return 0;
  }

  let str = text;
  str = str.trim();
  return str.length > 0 ? str.split(/\s+/).length : 0;
};
