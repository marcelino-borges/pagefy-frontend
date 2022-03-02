import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { Grid, useMediaQuery } from "@mui/material";
import { IUserComponent } from "../../../../../store/user/types";
import { getYoutubeIdFromUrl } from "../../../../../utils";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../constants";
import YoutubeEmbed from "../../../youtube-embed";
import BaseComponentType from "../base";
import strings from "../../../../../localization";
import { CountdownNumber } from "./style";

interface IProps {
  component: IUserComponent;
}

const LaunchComponent = ({ component }: IProps) => {
  const isSmallerThan400 = useMediaQuery("(max-width: 399px)");
  const isSmallerThan500 = useMediaQuery("(max-width: 499px)");

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (!completed) {
      return (
        <Grid container direction="column" wrap="nowrap">
          <Grid container item wrap="nowrap">
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(days)}
            </CountdownNumber>
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(hours)}
            </CountdownNumber>
            <CountdownNumber
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              {zeroPad(minutes)}
            </CountdownNumber>
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
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.days}
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.hours}
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.minutes}
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              xs={3}
            >
              {strings.seconds}
            </Grid>
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
    >
      <Grid
        container
        style={{
          backgroundImage: `url(${component.mediaUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px`,
          height: component.layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
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
          style={{ paddingTop: "16px" }}
        >
          {component.text || ""}
        </Grid>
      </Grid>
    </BaseComponentType>
  );
};

export default LaunchComponent;
