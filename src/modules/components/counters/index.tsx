import { Grid, Stack } from "@mui/material";
import { ICounter } from "./../../../store/user-pages/types";
import { LargeNumber, Root, VerticalLine } from "./style";

interface ICountersProps {
  counters: ICounter[];
  bgColor: string;
  color: string;
}

const Counters = ({ counters, bgColor, color }: ICountersProps) => {
  const Item = ({ counter, index }: any) => {
    return (
      <>
        <Grid item>
          <Stack direction="column" textAlign="center" gap="0px">
            <LargeNumber>{counter.number}</LargeNumber>
            <div>{counter.label}</div>
          </Stack>
        </Grid>

        {index < counters.length - 1 && (
          <Grid item>
            <VerticalLine
              style={{
                borderRightColor: color,
              }}
            ></VerticalLine>
          </Grid>
        )}
      </>
    );
  };
  return (
    <Root
      container
      justifyContent="space-around"
      style={{ backgroundColor: bgColor, color }}
    >
      {counters.map((counter: ICounter, index: number) => {
        return <Item counter={counter} index={index} />;
      })}
    </Root>
  );
};

export default Counters;
