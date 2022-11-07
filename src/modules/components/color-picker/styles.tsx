import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { PRIMARY_COLOR } from "../../../styles/colors";

export const ColorPickerSpan = styled(({ ...rest }: any) => <span {...rest} />)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(1, 1, 1, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: scale(1.3);
`;

export const Container = styled(({ ...rest }: any) => <div {...rest} />)`
  width: 300px;
  max-width: 70vw;

  & .sketch-picker {
    width: calc(100% - 20px) !important;
    max-width: 70vw;
    border-radius: 4px 4px 0px 0px !important;
  }
`;

export const Group = styled(({ ...rest }: any) => <div {...rest} />)`
  background-color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 0px 0px 4px 4px;
  transform: translateY(-1px);
`;

export const SubmitButton = styled(({ ...rest }: any) => <Button {...rest} />)`
  font-size: 0.6em;
  z-index: 5010;
  min-width: unset;

  &:hover {
    background-color: unset;
    color: ${PRIMARY_COLOR};
  }
`;
