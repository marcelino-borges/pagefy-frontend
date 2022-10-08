import { styled } from "@mui/material";
import quoteSVG from "../../../assets/img/quote-grey.svg";
import {
  SECONDARY_COLOR,
  SECONDARY_COLOR_DARKER,
} from "./../../../styles/colors";

export const Root = styled(({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  () => `
  display: flex;
  flex-direction: column;
  background-image: url(${quoteSVG});
  background-size: 100% 100%;
  align-items: center;
  text-align: center;
  line-height: 1.5em;
  max-width: 321px;
`
);

export const UserPicture = styled(({ userImage, children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  ({ userImage }) => `
  display: flex;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-image: url(${userImage});
  background-size: cover;
  background-color: white;

`
);

export const Testimonial = styled(({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  () => `
  padding: 32px 0;
`
);

export const UserName = styled(({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  () => `
  font-weight: 600;
  color: ${SECONDARY_COLOR}
`
);

export const UserProfession = styled(({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  () => `
  font-weight: 600;
  color: ${SECONDARY_COLOR_DARKER};
`
);

export const UserCompany = styled(({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  () => `
  font-weight: 600;
  color: ${SECONDARY_COLOR_DARKER};
`
);
