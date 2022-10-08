import { PRIMARY_COLOR } from "../../../styles/colors";
import { TitleSection } from "./style";

interface IPageTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  increasingSize?: boolean;
  baseSize?: number;
  sizeGrowth?: number;
  colors?: string[];
  marginTop?: string;
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

const PageTitle = ({
  title,
  subtitle,
  description,
  baseSize = 1,
  sizeGrowth = 0.5,
  increasingSize,
  colors = [PRIMARY_COLOR, "#000", "#000"],
  marginTop = "0px",
  textAlign,
}: IPageTitleProps) => {
  const textsColors = colors?.length === 3 ? colors : ["#000", "#000", "#000"];

  return (
    <>
      <TitleSection
        style={{
          fontSize: baseSize + "em",
          fontWeight: 800,
          color: textsColors[0],
          marginTop,
          textAlign,
        }}
      >
        {title}
      </TitleSection>
      {subtitle && (
        <TitleSection
          style={{
            fontSize: increasingSize
              ? baseSize + 2 * sizeGrowth + "em"
              : baseSize - 2 * sizeGrowth + "em",
            fontWeight: 800,
            color: textsColors[1],
            textAlign,
          }}
        >
          {subtitle}
        </TitleSection>
      )}
      {description && (
        <TitleSection
          style={{
            fontSize: increasingSize
              ? baseSize + 2 * sizeGrowth + "em"
              : baseSize - 2 * sizeGrowth + "em",
            color: textsColors[2],
            textAlign,
          }}
        >
          {description}
        </TitleSection>
      )}
    </>
  );
};

export default PageTitle;
