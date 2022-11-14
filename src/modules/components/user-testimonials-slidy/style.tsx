import { styled } from "@mui/material";
import { Stack } from "@mui/material";
import { PRIMARY_COLOR } from "../../../styles/colors";

export const CARD_SLIDE_DURATION = 200;
export const CARD_SLIDE_TRANSITION = `all ${
  CARD_SLIDE_DURATION / 1000
}s ease-in-out`;

export const TestimonialsContainer = styled("div")`
  position: relative;
  max-width: 50vw;
  width: 100%;
  margin-bottom: 68px;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

export const TestimonialCard = styled(Stack)`
  background: white;
  border-radius: 14px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  padding: 32px;
  transition: ${CARD_SLIDE_TRANSITION};
  visibility: visible;
`;

export const TestimonialText = styled("div")`
  width: 100%;
  margin-bottom: 24px;
  overflow-y: auto;
  max-height: 150px;
`;

export const UserName = styled("div")`
  font-weight: 500;
`;

export const UserPicture = styled(({ pictureUrl, children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  ({ pictureUrl }: any) => `
  background-image: url(${pictureUrl});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
);

export const NavigationContainer = styled(Stack)`
  position: absolute;
  right: 32px;
  bottom: 32px;
  gap: 16px;
`;

export const ArrowIcon = styled(({ isLeft, children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  ({ isLeft }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  background-color: ${isLeft ? "#fff" : "#000"};
  color: ${isLeft ? "#000" : "#fff"};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${PRIMARY_COLOR};
    color: #fff;
    border: 1px solid ${PRIMARY_COLOR};
  }
`
);
