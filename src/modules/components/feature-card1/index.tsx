import { Grid } from "@mui/material";
import {
  CardInner,
  CardRoot,
  FeaturedOverlayArrow,
  FeaturedOverlayContainer,
  FeaturedOverlayText,
} from "./style.";
import { PRIMARY_COLOR } from "../../../styles/colors";
import strings from "../../../localization";
import customIcons from "../../../assets/icons/custom-icons/index";

interface IFeaturedCard1Props {
  overTitle: string;
  title: string;
  children?: any;
  isFeatured?: boolean;
}

const FeaturedCard1 = ({
  overTitle,
  title,
  isFeatured,
  children,
}: IFeaturedCard1Props) => {
  return (
    <CardRoot isFeatured={isFeatured !== undefined}>
      {isFeatured !== undefined && (
        <FeaturedOverlayContainer>
          <FeaturedOverlayText>{strings.recommended}</FeaturedOverlayText>
          <div>
            <FeaturedOverlayArrow src={customIcons.arrowIcon} />
          </div>
        </FeaturedOverlayContainer>
      )}
      <CardInner>
        <Grid
          container
          justifyContent="center"
          fontWeight="800"
          color={PRIMARY_COLOR}
          fontSize="1.5em"
          pt="48px"
        >
          {overTitle}
        </Grid>
        <Grid container justifyContent="center" fontWeight="800" fontSize="2em">
          {title}
        </Grid>
        <Grid
          container
          justifyContent="center"
          fontWeight="600"
          fontSize="1em"
          p="16px"
          pb="48px"
        >
          {children}
        </Grid>
      </CardInner>
    </CardRoot>
  );
};

export default FeaturedCard1;
