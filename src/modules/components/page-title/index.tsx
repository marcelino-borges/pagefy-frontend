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
}: IPageTitleProps) => {
  const textsColors = colors?.length === 3 ? colors : ["#000", "#000", "#000"];

  return (
    <div
      style={{
        marginBottom,
      }}
    >
      <TitleSection
        style={{
          fontSize: sizes ? sizes[0] + "em" : baseSize + "em",
          fontWeight: 800,
          color: textsColors[0],
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
            fontWeight: 800,
            color: textsColors[1],
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
            color: textsColors[2],
            textAlign,
          }}
        >
          {titles[2]}
        </TitleSection>
      )}
    </div>
  );
};

export default TriplePageTitle;
