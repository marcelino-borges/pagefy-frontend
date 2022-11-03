import { Grid, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ICounter } from "./../../../store/user-pages/types";
import { LargeNumber, Root, VerticalLine } from "./style";

interface ICountersProps {
  counters: ICounter[];
  bgColor: string;
  color: string;
}

const INCREMENT_DELAY = 20;

const Counters = ({ counters, bgColor, color }: ICountersProps) => {
  const [currentCountersValues, setCurrentCountersValues] = useState<
    ICounter[]
  >([]);
  const [needsIncrement, setNeedsIncrement] = useState(true);

  const incrementCounters = useCallback(() => {
    setTimeout(() => {
      let needsToIncrement = false;
      const incrementedCounters: ICounter[] = currentCountersValues.map(
        (currentCounter: ICounter, index: number) => {
          if (currentCounter.number < counters[index].number) {
            const updatedCounter = {
              ...currentCounter,
              number: currentCounter.number + 1,
            };
            if (updatedCounter.number < counters[index].number) {
              needsToIncrement = true;
            }
            return updatedCounter;
          }
          return currentCounter;
        }
      );
      setCurrentCountersValues([...incrementedCounters]);

      setNeedsIncrement(needsToIncrement);
    }, INCREMENT_DELAY);
  }, [counters, currentCountersValues]);

  useEffect(() => {
    if (currentCountersValues.length && needsIncrement) {
      incrementCounters();
    }
  }, [currentCountersValues, incrementCounters, needsIncrement]);

  useEffect(() => {
    if (counters.length) {
      const zeroCounters: ICounter[] = counters.map((counter: ICounter) => ({
        ...counter,
        number: 0,
      }));
      setNeedsIncrement(true);

      setCurrentCountersValues(zeroCounters);
    }
  }, [counters]);

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
      {currentCountersValues.map((counter: ICounter, index: number) => {
        return (
          <Item
            counter={counter}
            index={index}
            key={`${counter.label} - ${counter.number} - ${index}`}
          />
        );
      })}
    </Root>
  );
};

export default Counters;
