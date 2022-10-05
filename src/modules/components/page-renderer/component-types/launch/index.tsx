import Countdown, { zeroPad } from "react-countdown";
import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../../constants";
import BaseComponentType from "../base";
import strings from "../../../../../localization";
import {
  CountdownNumber,
  CountdownOuterTexts,
  CountdownSeparator,
} from "./style";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface ILaunchComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const LaunchComponent = ({ component, pageId }: ILaunchComponentProps) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (!completed) {
      return (
        <Grid container direction="column" wrap="nowrap">
          <Grid container item wrap="nowrap" alignItems="center">
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(days)}
            </CountdownNumber>
            <CountdownSeparator item>:</CountdownSeparator>
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(hours)}
            </CountdownNumber>

            <CountdownSeparator item>:</CountdownSeparator>
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(minutes)}
            </CountdownNumber>

            <CountdownSeparator item>:</CountdownSeparator>
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(seconds)}
            </CountdownNumber>
          </Grid>

          <Grid container item wrap="nowrap">
            <CountdownOuterTexts
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.days}
            </CountdownOuterTexts>
            <CountdownOuterTexts
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.hours}
            </CountdownOuterTexts>
            <CountdownOuterTexts
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.minutesAbbreviated}
            </CountdownOuterTexts>
            <CountdownOuterTexts
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.secondsAbbreviated}
            </CountdownOuterTexts>
          </Grid>
        </Grid>
      );
    }

    return null;
  };

  return (
    <BaseComponentType
      layout={component.layout}
      style={component.style}
      url={component.url}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid
        container
        style={{
          backgroundImage: `url(${component.mediaUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px`,
          minHeight: component.layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
          padding: "16px",
        }}
        direction="column"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Grid container justifyContent="center" alignItems="center">
          {strings.launchPrefixText}
        </Grid>
        {component.launchDate && (
          <Countdown
            date={new Date(component.launchDate)}
            renderer={renderer}
          />
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ paddingTop: "16px", textAlign: "center" }}
        >
          {component.text || ""}
        </Grid>
      </Grid>
    </BaseComponentType>
  );
};

export default LaunchComponent;
