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
}

const PageTitle = ({
  title,
  subtitle,
  description,
  baseSize = 1,
  sizeGrowth = 0.5,
  increasingSize,
  colors,
  marginTop = "0px",
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
          }}
        >
          {description}
        </TitleSection>
      )}
    </>
  );
};

export default PageTitle;
