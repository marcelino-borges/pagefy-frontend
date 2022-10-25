import styled from "@emotion/styled";
import { MEDIUM_GREY } from "../../../../../styles/colors";
import { ACESSIBILITY_RED } from "./../../../../../styles/colors";

export const IconOverlaySpan = styled(
  ({ isRendererPage, children, ...rest }: any) =>
    isRendererPage ? (
      <a {...rest}>{children}</a>
    ) : (
      <span {...rest}>{children}</span>
    )
)`
  color: ${MEDIUM_GREY};
  font-size: 20px;
  margin: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & #delete-icon-bg {
    position: absolute;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: ${ACESSIBILITY_RED};
    opacity: 1;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: -2px;
    right: -2px;
    z-index: 1;
    cursor: pointer;
  }

  & #delete-icon {
    color: white;
    opacity: 1;
    font-size: 16px;
  }

  &:hover #app-icon path {
    color: ${ACESSIBILITY_RED};
    opacity: 0.5;
  }

  &:hover #delete-icon-bg {
    display: flex;
    opacity: 1;
  }
`;
