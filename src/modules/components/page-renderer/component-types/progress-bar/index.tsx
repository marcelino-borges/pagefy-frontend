import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserComponent } from "../../../../../store/user-pages/types";
import { RENDERED_PAGE_COMPONENT_HEIGHT } from "../../../../../constants";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import ProgressBar from "../../../progress-bar";

interface IProgressBarComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
  fontColor?: string | undefined;
}

const ProgressBarComponent = ({
  component,
  pageId,
  fontColor,
}: IProgressBarComponentProps) => {
  const isSmallerThan500 = useMediaQuery("(max-width: 499px)");

  const [widthMultiplier, setWidthMultiplier] = useState<number>(0);

  useEffect(() => {
    if (isSmallerThan500) {
      setWidthMultiplier(2);
    } else {
      setWidthMultiplier(0);
    }
  }, [isSmallerThan500]);

  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={{
        ...component.style,
        height:
          RENDERED_PAGE_COMPONENT_HEIGHT * (6 - widthMultiplier) +
          "px !important",
      }}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid style={{ width: "100%", paddingTop: "16px" }}>
        <div
          style={{
            marginBottom: "16px",
            textAlign: "center",
            color: fontColor || "black",
          }}
        >
          {component.text}
        </div>
        <ProgressBar
          progressValue={component.progressValue || 0}
          fillColor={component.style?.color}
          bgColor={component.style?.backgroundColor}
          valueVerticalOffset={-3}
        />
      </Grid>
    </BaseComponentType>
  );
};

export default ProgressBarComponent;
