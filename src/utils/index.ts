export const stringShortener = (originalString: string, maxSize: number) => {
  if (originalString.length > maxSize)
    return originalString.substring(0, maxSize) + "...";

  return originalString;
};
