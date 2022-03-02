import { Grid, styled } from "@mui/material";

export const CountdownNumber = styled(({ ...rest }: any) => <Grid {...rest} />)`
  font-size: 2.5em;
  font-weight: 500;
  background-color: white;
  color: black;
  padding: 8px;
  margin: 12px;
  border-radius: 8px;

  @media (max-width: 550px) {
    padding: 4px;
    font-size: 1.5em;
    margin: 4px;
  }

  @media (max-width: 350px) {
    font-size: 1em;
    margin: 2px;
  }
`;

export const CountdownSeparator = styled(({ ...rest }: any) => (
  <Grid {...rest} />
))`
  font-size: 1.5em;
  font-weight: 600;
`;

export const CountdownOuterTexts = styled(({ ...rest }: any) => (
  <Grid {...rest} />
))`
  font-size: 1em;
  text-align: center;

  @media (max-width: 550px) {
    font-size: 0.9em;
  }

  @media (max-width: 350px) {
    font-size: 0.8em;
  }
`;
