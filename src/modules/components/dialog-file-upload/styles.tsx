import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const DropzoneFileReady = styled(({ ...rest }: any) => (
  <Grid {...rest} />
))`
  color: #3dd381;
  height: 100%;
`;

export const Dropzone = styled(({ ...rest }: any) => <Grid {...rest} />)`
  flex: 1;
  display: flex;
  font-size: 18px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 10px;
  border-color: #ececec;
  border-style: dashed;
  color: #bbbbbb;
  outline: none;
  transition: border 0.24s ease-in-out, color 0.24s ease-in-out;
  cursor: pointer;
  height: 100%;

  &:hover {
    color: var(--theme-primary);
    border-color: var(--theme-primary);
  }
`;
