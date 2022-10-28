import { PRIMARY_COLOR } from "../../../styles/colors";
import { BG, Fill, Value } from "./style";

interface IProgressBarProps {
  progressValue: number;
  fillColor?: string | undefined;
  bgColor?: string | undefined;
  valueVerticalOffset?: number | undefined;
}

const ProgressBar = ({
  progressValue,
  fillColor,
  bgColor,
  valueVerticalOffset,
}: IProgressBarProps) => {
  return (
    <BG style={{ backgroundColor: bgColor || "black" }}>
      <Fill
        style={{
          width: `${progressValue}%`,
          backgroundColor: fillColor || PRIMARY_COLOR,
        }}
      >
        <Value
          style={{
            color: fillColor,
            transform: `translateY(calc(50% + ${
              (valueVerticalOffset || 0) + "px"
            }))`,
          }}
        >
          {progressValue}%
        </Value>
      </Fill>
    </BG>
  );
};

export default ProgressBar;
