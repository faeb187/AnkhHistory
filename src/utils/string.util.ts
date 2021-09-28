export const camelize = (word: string, delimiter = "/"): string => {
  return word
    .split(delimiter)
    .map((w, i) => `${(i && w[0].toUpperCase()) || w[0]}${w.slice(1)}`)
    .join("");
};
