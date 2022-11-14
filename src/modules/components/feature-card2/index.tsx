import { Grid } from "@mui/material";
import {
  CardInner,
  CardRoot,
  FeaturedOverlayArrow,
  FeaturedOverlayContainer,
  FeaturedOverlayText,
} from "./style.";
import strings from "../../../localization";
import customIcons from "../../../assets/icons/custom-icons/index";

interface IFeaturedCard2Props {
  row1: string | JSX.Element;
  row2: string | JSX.Element;
  row3?: string | JSX.Element;
  children?: any;
  isFeatured?: boolean;
}

const FeaturedCard2 = ({
  row1,
  row2,
  row3,
  isFeatured,
  children,
}: IFeaturedCard2Props) => {
  return (
    <CardRoot isFeatured={!!isFeatured}>
      {isFeatured && (
        <FeaturedOverlayContainer>
          <FeaturedOverlayText>{strings.recommended}</FeaturedOverlayText>
          <div>
            <FeaturedOverlayArrow src={customIcons.arrowIcon2} />
          </div>
        </FeaturedOverlayContainer>
      )}
      <CardInner>
        <Grid
          container
          justifyContent="center"
          fontWeight="500"
          fontSize="1.5em"
          pt="48px"
        >
          {row1}
        </Grid>
        <Grid container justifyContent="center" fontWeight="800" fontSize="2em">
          {row2}
        </Grid>
        {row3 && (
          <Grid
            container
            justifyContent="center"
            fontWeight="400"
            fontSize="1.2em"
          >
            {row3}
          </Grid>
        )}
        <Grid
          container
          justifyContent="center"
          fontWeight="600"
          fontSize="1em"
          p="32px"
          pb="48px"
        >
          {children}
        </Grid>
      </CardInner>
    </CardRoot>
  );
};

export default FeaturedCard2;
