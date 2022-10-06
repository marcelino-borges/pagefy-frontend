import { APP_ENVIROMENT } from "../../constants";
import { IUserPage } from "../../store/user-pages/types";

export const createOpenGraphTags = (pageToRender: IUserPage, document: any) => {
  //<meta property="og:title" content="The Rock" />
  let metaTitle = document.createElement("meta");
  metaTitle.setAttribute("property", "og:title");
  metaTitle.setAttribute("content", pageToRender.name);
  document.getElementsByTagName("head")[0].appendChild(metaTitle);

  //<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
  let metaUrl = document.createElement("meta");
  metaUrl.setAttribute("property", "og:url");
  let urlNormalized = "";

  if (pageToRender.url[0] !== "/") urlNormalized = "/" + pageToRender.url;
  else urlNormalized = pageToRender.url;

  metaUrl.setAttribute(
    "content",
    (APP_ENVIROMENT === "PROD"
      ? "https://socialbio.me"
      : "https://socialbio-frontend-dev.me") + urlNormalized
  );
  document.getElementsByTagName("head")[0].appendChild(metaUrl);

  const img = new Image();
  img.src = pageToRender.pageImageUrl || "";
  img.onload = () => {
    // <meta property="og:image" content="http://example.com/logo.jpg" />
    let metaImage = document.createElement("meta");
    metaImage.setAttribute("property", "og:image");
    metaImage.setAttribute("content", pageToRender.pageImageUrl || "");
    document.getElementsByTagName("head")[0].appendChild(metaImage);

    // <meta property="og:image:alt" content="http://example.com/logo.jpg" />
    let metaImageAlt = document.createElement("meta");
    metaImageAlt.setAttribute("property", "og:image:alt");
    metaImageAlt.setAttribute("content", pageToRender.name);
    document.getElementsByTagName("head")[0].appendChild(metaImageAlt);

    // <meta property="og:image:type" content="image/png" />
    let metaImageType = document.createElement("meta");
    metaImageType.setAttribute("property", "og:image:type");
    metaImageType.setAttribute(
      "content",
      "image/jpeg, image/png, image/jpg, image/gif, image/webp"
    );
    document.getElementsByTagName("head")[0].appendChild(metaImageType);
    // <meta property="og:image:width" content="1024" />
    let metaImageWidth = document.createElement("meta");
    metaImageWidth.setAttribute("property", "og:image:width");
    metaImageWidth.setAttribute("content", img.naturalWidth.toString());
    document.getElementsByTagName("head")[0].appendChild(metaImageWidth);

    // <meta property="og:image:height" content="1024"></meta />
    let metaImageHeight = document.createElement("meta");
    metaImageHeight.setAttribute("property", "og:image:height");
    metaImageHeight.setAttribute("content", img.naturalHeight.toString());
    document.getElementsByTagName("head")[0].appendChild(metaImageHeight);
  };
};

export const getOpenGraphTags = (
  pageToRender: IUserPage,
  document: any
): React.ReactElement[] => {
  const tags: React.ReactElement[] = [];

  //<meta property="og:title" content="The Rock" />
  let metaTitle = document.createElement("meta");
  metaTitle.setAttribute("property", "og:title");
  metaTitle.setAttribute("content", pageToRender.name);
  tags.push(metaTitle);

  //<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
  let metaUrl = document.createElement("meta");
  metaUrl.setAttribute("property", "og:url");
  let urlNormalized = "";

  if (pageToRender.url[0] !== "/") urlNormalized = "/" + pageToRender.url;
  else urlNormalized = pageToRender.url;

  metaUrl.setAttribute(
    "content",
    (APP_ENVIROMENT === "PROD"
      ? "https://socialbio.me"
      : "https://socialbio-frontend-dev.me") + urlNormalized
  );
  tags.push(metaUrl);

  // <meta property="og:image" content="http://example.com/logo.jpg" />
  let metaImage = document.createElement("meta");
  metaImage.setAttribute("property", "og:image");
  metaImage.setAttribute("content", pageToRender.pageImageUrl || "");
  tags.push(metaImage);

  // <meta property="og:image:alt" content="http://example.com/logo.jpg" />
  let metaImageAlt = document.createElement("meta");
  metaImageAlt.setAttribute("property", "og:image:alt");
  metaImageAlt.setAttribute("content", pageToRender.name);
  tags.push(metaImageAlt);

  // <meta property="og:image:type" content="image/png" />
  let metaImageType = document.createElement("meta");
  metaImageType.setAttribute("property", "og:image:type");
  metaImageType.setAttribute(
    "content",
    "image/jpeg, image/png, image/jpg, image/gif, image/webp"
  );
  tags.push(metaImageType);

  // <meta property="og:image:width" content="1024" />
  let metaImageWidth = document.createElement("meta");
  metaImageWidth.setAttribute("property", "og:image:width");
  metaImageWidth.setAttribute("content", "1024");
  tags.push(metaImageWidth);

  // <meta property="og:image:height" content="1024"></meta />
  let metaImageHeight = document.createElement("meta");
  metaImageHeight.setAttribute("property", "og:image:height");
  metaImageHeight.setAttribute("content", "1024");
  tags.push(metaImageHeight);

  return tags;
};
