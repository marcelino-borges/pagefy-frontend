import desktopBanner1 from "./desktop-banners/banner1.jpg";
import desktopBanner2 from "./desktop-banners/banner2.jpg";
import desktopBanner3 from "./desktop-banners/banner3.jpg";
import desktopBanner4 from "./desktop-banners/banner4.jpg";
import desktopBanner5 from "./desktop-banners/banner5.jpg";
import desktopBanner6 from "./desktop-banners/banner6.jpg";
import desktopBanner7 from "./desktop-banners/banner7.jpg";
import desktopBanner8 from "./desktop-banners/banner8.jpg";
import desktopBanner9 from "./desktop-banners/banner9.jpg";
import desktopBanner10 from "./desktop-banners/banner10.jpg";
import desktopBanner11 from "./desktop-banners/banner11.jpg";
import desktopBanner12 from "./desktop-banners/banner12.jpg";

import mobileBanner1 from "./mobile-banners/banner1.jpg";
import mobileBanner2 from "./mobile-banners/banner2.jpg";
import mobileBanner3 from "./mobile-banners/banner3.jpg";
import mobileBanner4 from "./mobile-banners/banner4.jpg";
import mobileBanner5 from "./mobile-banners/banner5.jpg";
import mobileBanner6 from "./mobile-banners/banner6.jpg";
import mobileBanner7 from "./mobile-banners/banner7.jpg";
import mobileBanner8 from "./mobile-banners/banner8.jpg";
import mobileBanner9 from "./mobile-banners/banner9.jpg";
import mobileBanner10 from "./mobile-banners/banner10.jpg";
import mobileBanner11 from "./mobile-banners/banner11.jpg";
import mobileBanner12 from "./mobile-banners/banner12.jpg";
import bgImage from "./bg1.jpg";

export interface IHomepageBanner {
  theme: "light" | "dark";
  path: string;
}

interface IHomeImages {
  bgImage: string;
  desktopBanners: IHomepageBanner[];
  mobileBanners: IHomepageBanner[];
}

const homeImages: IHomeImages = {
  bgImage: bgImage,
  desktopBanners: [
    {
      path: desktopBanner1,
      theme: "light",
    },
    {
      path: desktopBanner2,
      theme: "dark",
    },
    {
      path: desktopBanner3,
      theme: "dark",
    },
    {
      path: desktopBanner4,
      theme: "light",
    },
    {
      path: desktopBanner5,
      theme: "dark",
    },
    {
      path: desktopBanner6,
      theme: "light",
    },
    {
      path: desktopBanner7,
      theme: "dark",
    },
    {
      path: desktopBanner8,
      theme: "light",
    },
    {
      path: desktopBanner9,
      theme: "dark",
    },
    {
      path: desktopBanner10,
      theme: "dark",
    },
    {
      path: desktopBanner11,
      theme: "dark",
    },
    {
      path: desktopBanner12,
      theme: "dark",
    },
  ],
  mobileBanners: [
    {
      path: mobileBanner1,
      theme: "light",
    },
    {
      path: mobileBanner2,
      theme: "dark",
    },
    {
      path: mobileBanner3,
      theme: "dark",
    },
    {
      path: mobileBanner4,
      theme: "light",
    },
    {
      path: mobileBanner5,
      theme: "dark",
    },
    {
      path: mobileBanner6,
      theme: "light",
    },
    {
      path: mobileBanner7,
      theme: "dark",
    },
    {
      path: mobileBanner8,
      theme: "light",
    },
    {
      path: mobileBanner9,
      theme: "dark",
    },
    {
      path: mobileBanner10,
      theme: "dark",
    },
    {
      path: mobileBanner11,
      theme: "dark",
    },
    {
      path: mobileBanner12,
      theme: "dark",
    },
  ],
};

export default homeImages;
