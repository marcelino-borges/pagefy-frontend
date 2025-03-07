import { PRIMARY_COLOR } from "../../../styles/colors";
import { TitleSection } from "./style";

interface IPageTitleProps {
  titles: string[];
  increasingSize?: boolean;
  baseSize?: number;
  sizeGrowth?: number;
  colors?: string[];
  marginTop?: string;
  marginBottom?: string;
  sizes?: number[];
  weights?: number[];
  textAlign?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent"
    | undefined;
}

const FALLBACK_COLOR = "#000";

const TriplePageTitle = ({
  titles = ["", "", ""],
  baseSize = 1,
  sizeGrowth = 0.5,
  increasingSize,
  colors = [PRIMARY_COLOR, "#000", "#000"],
  marginTop = "0px",
  marginBottom = "0px",
  sizes,
  textAlign,
  weights,
}: IPageTitleProps) => {
  return (
    <div
      style={{
        marginBottom,
      }}
    >
      <TitleSection
        style={{
          fontSize: sizes ? sizes[0] + "em" : baseSize + "em",
          fontWeight: weights?.[0] ?? 800,
          color: colors?.[0] ?? FALLBACK_COLOR,
          marginTop,
          textAlign,
        }}
      >
        {titles[0]}
      </TitleSection>
      {titles[1] && (
        <TitleSection
          style={{
            fontSize: sizes
              ? sizes[1] + "em"
              : increasingSize
              ? baseSize + 2 * sizeGrowth + "em"
              : baseSize - 2 * sizeGrowth + "em",
            fontWeight: weights?.[1] ?? 800,
            color: colors?.[1] ?? FALLBACK_COLOR,
            textAlign,
          }}
        >
          {titles[1]}
        </TitleSection>
      )}
      {titles[2] && (
        <TitleSection
          style={{
            fontSize: sizes
              ? sizes[2] + "em"
              : increasingSize
              ? baseSize + 2 * sizeGrowth + "em"
              : baseSize - 2 * sizeGrowth + "em",
            color: colors?.[2] ?? FALLBACK_COLOR,
            textAlign,
            fontWeight: weights?.[2] ?? 400,
          }}
        >
          {titles[2]}
        </TitleSection>
      )}
    </div>
  );
};

export default TriplePageTitle;
