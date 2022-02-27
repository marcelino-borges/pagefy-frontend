import { styled } from "@mui/system";

export const ResponsiveVideo = styled("div")`
  overflow: hidden;
  position: relative;
  height: 0;

  & iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;
