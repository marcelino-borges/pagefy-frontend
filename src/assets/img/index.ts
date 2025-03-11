import logoHeader from "./logo-header.png";
import placeholderImage from "./placeholder-image.jpg";
import bannerDesktop1 from "./banner-desktop-no-text.jpg";
import bannerMobile1 from "./banner-mobile-no-text.jpg";
import sectionTop1 from "./section-top.png";
import sectionMiddle1 from "./section-middle.png";
import sectionBottom1 from "./section-bottom.png";
import iphone14 from "./iphone14.png";
import bg1home2 from "./home2/bg1-home2.png";
import bg1home2Mobile from "./home2/bg1-home2-mobile.png";
import actress1 from "./home2/actress1.png";
import actress2 from "./home2/actress2.png";
import banner1 from "./vertical-banner1.jpg";
import banner2 from "./vertical-banner2.jpg";
import banner3 from "./vertical-banner3.jpg";
import banner4 from "./vertical-banner4.jpg";
import banner5 from "./vertical-banner5.jpg";
import banner6 from "./vertical-banner6.jpg";
import banner7 from "./vertical-banner7.jpg";
import banner8 from "./vertical-banner8.jpg";
import banner9 from "./vertical-banner9.jpg";
import banner10 from "./vertical-banner10.jpg";
import banner11 from "./vertical-banner11.jpg";
import banner12 from "./vertical-banner12.jpg";
import banner13 from "./vertical-banner13.jpg";
import banner14 from "./horizontal-banner-14.jpg";
import banner15 from "./horizontal-banner-15.jpg";
import banner16 from "./horizontal-banner-16.jpg";
import banner17 from "./horizontal-banner-17.jpg";
import banner18 from "./horizontal-banner-18.jpg";
import banner19 from "./horizontal-banner-19.jpg";
import banner20 from "./horizontal-banner-20.jpg";
import poweredStripe from "./powered-stripe.png";
import homeScreenshot from "./screenshots/home.jpg";
import loginScreenshot from "./screenshots/login.jpg";
import signupScreenshot from "./screenshots/signup.jpg";
import supportScreenshot from "./screenshots/support.jpg";
import pageEditorScreenshot from "./screenshots/page-editor.jpg";
import userPagesScreenshot from "./screenshots/user-pages.jpg";

const images = {
  logoHeader,
  placeholderImage,
  bannerDesktop1,
  bannerMobile1,
  sectionTop1,
  sectionMiddle1,
  sectionBottom1,
  iphone14,
  bg1home2,
  bg1home2Mobile,
  actress1,
  actress2,
  poweredStripe,
  verticalBanners: [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
    banner8,
    banner9,
    banner10,
    banner11,
    banner12,
    banner13,
  ],
  horizontalBanners: [
    banner14,
    banner15,
    banner16,
    banner17,
    banner18,
    banner19,
    banner20,
  ],
  screenshots: {
    home: homeScreenshot,
    login: loginScreenshot,
    signup: signupScreenshot,
    support: supportScreenshot,
    pageEditor: pageEditorScreenshot,
    userPages: userPagesScreenshot,
  },
} as const;

export default images;
