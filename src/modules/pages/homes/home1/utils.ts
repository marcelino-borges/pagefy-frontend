export const setBackgroundImage = (document: any, image: string) => {
  document.body.style.backgroundImage = `url(${image})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
};

export const clearBackgroundImage = (document: any) => {
  document.body.style.backgroundImage = `unset`;
  document.body.style.backgroundSize = "unset";
  document.body.style.backgroundPosition = "unset";
  document.body.style.backgroundAttachment = "unset";
};
