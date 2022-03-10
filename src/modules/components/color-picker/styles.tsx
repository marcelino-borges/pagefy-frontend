import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const ColorPickerSpan = styled(({ ...rest }: any) => <span {...rest} />)`
  z-index: 5000;
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

export const Group = styled(({ ...rest }: any) => <div {...rest} />)`
  background-color: white;
  transform: translateY(-8px);
  height: 70px;
  width: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 0px 0px 4px 4px;
`;

export const SubmitButton = styled(({ ...rest }: any) => <Button {...rest} />)`
  margin: 0;
  z-index: 5001;
  height: 36px;
  font-size: 0.6em;
  z-index: 5010;
`;
