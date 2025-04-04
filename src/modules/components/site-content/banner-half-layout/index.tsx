import { Link } from "react-router-dom";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import { Banner } from "./style";
import images from "../../../../assets/img";
import PAGES_ROUTES from "../../../../routes/paths";
import Logos from "../../../../assets/img/logos";
import { getRandomInt } from "../../../../utils";
import { PropsWithChildren, useEffect } from "react";
import { useState } from "react";
import strings from "../../../../localization";

interface BannerHalfLayoutProps {
  bannerIndexToUse?: number;
  bgPosition?: string;
}

const BannerHalfLayout = ({
  children,
  bannerIndexToUse,
  bgPosition,
}: PropsWithChildren<BannerHalfLayoutProps>) => {
  const isSmallerThan800 = useMediaQuery("(max-width: 800px)");
  const isSmallerThan300 = useMediaQuery("(max-width: 300px)");
  const [bannerIndex, setBannerIndex] = useState(bannerIndexToUse ?? 0);

  useEffect(() => {
    if (bannerIndexToUse === undefined) {
      const randomIndex = getRandomInt(0, images.verticalBanners.length);
      setBannerIndex(randomIndex);
    }
  }, [bannerIndexToUse]);

  return (
    <Stack
      direction={isSmallerThan800 ? "column" : "row"}
      alignItems="center"
      height="100vh"
      width="100%"
      pb={isSmallerThan800 ? "150px" : "unset"}
    >
      <Banner
        image={images.verticalBanners[bannerIndex]}
        bgPosition={bgPosition}
      >
        <Link to={PAGES_ROUTES.root}>
          <img
            src={Logos.LogoHorizontalDarkBGBorderPNG}
            alt={strings.appName}
            id="logo-signin"
          />
        </Link>
      </Banner>

      <Grid
        container
        item
        justifyContent="center"
        width={isSmallerThan800 ? "100vw" : "50vw"}
        pt={isSmallerThan800 ? (isSmallerThan300 ? "16px" : "32px") : "unset"}
      >
        <Stack
          direction="column"
          width={isSmallerThan800 ? "100%" : "60%"}
          px={isSmallerThan800 ? (isSmallerThan300 ? "16px" : "32px") : "unset"}
          maxWidth={isSmallerThan800 ? "400px" : "unset"}
        >
          {children}
        </Stack>
      </Grid>
    </Stack>
  );
};

export default BannerHalfLayout;
