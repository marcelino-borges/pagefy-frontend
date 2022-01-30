import { DraggableUserComponentProps } from "../interfaces";
import { Grid, IconButton } from "@mui/material";
import {
  DragHandle,
  Parent,
  Container,
  Overlay,
  LabelText,
  UrlIconItem,
  UrlTextItem,
  EditIconItem,
  ToolsColumn,
  ToolIconButton,
  ToolGridItem,
} from "./style";
import { useEffect, useState } from "react";
import {
  Label as LabelIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  FormatColorFill as FormatColorFillIcon,
  FormatColorText as FormatColorTextIcon,
  ImageSearch as ImageSearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  AutoFixHigh as AutoFixHighIcon,
} from "@mui/icons-material";
import { PRIMARY_COLOR } from "../../../../../styles/colors";

const DraggableUserComponent = ({
  item: component,
  itemSelected,
  dragHandleProps,
}: DraggableUserComponentProps) => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    setIsBeingDragged(itemSelected !== 0);
  }, [itemSelected]);

  useEffect(() => {
    if (isBeingDragged) console.log(`${component.label} moving`);
  }, [isBeingDragged]);

  return (
    <Parent
      container
      item
      direction="row"
      onMouseLeave={() => setIsHovering(false)}
    >
      <Container
        container
        item
        isHoveringComponent={isHovering}
        direction="row"
        onMouseOver={() => setIsHovering(true)}
        xs={10}
        sm={11}
      >
        <Overlay
          style={{
            border: isHovering
              ? `1px solid ${PRIMARY_COLOR}`
              : `1px solid rgba(0, 0, 0, 0)`,
          }}
        />
        {/* Handler */}
        <Grid container item xs={1} alignItems="center">
          <DragHandle isHoveringComponent={isHovering} {...dragHandleProps} />
        </Grid>

        {/* Content */}
        <Grid
          container
          item
          xs={8}
          justifyContent="center"
          direction="column"
          spacing={2}
        >
          {/* Label */}
          <Grid container item direction="row">
            {/* <Grid item>
              <LabelIcon />
            </Grid> */}
            <LabelText item>
              <strong>{component.label}</strong>
            </LabelText>
            <EditIconItem item>
              <EditIcon />
            </EditIconItem>
          </Grid>

          {/* URL */}
          <Grid container item alignItems="center" direction="row">
            <UrlIconItem item>
              <LinkIcon />
            </UrlIconItem>
            <UrlTextItem item>{component.url}</UrlTextItem>
            <EditIconItem item>
              <EditIcon />
            </EditIconItem>
          </Grid>
        </Grid>

        {/* Analytics */}
        <Grid container item xs={3} alignItems="center">
          <Grid item>Analytics</Grid>
        </Grid>
      </Container>

      {/* Tools column */}
      <Grid
        container
        item
        xs={2}
        sm={1}
        justifyContent="space-between"
        alignItems="stretch"
        direction="column"
        style={{ textAlign: "center", margin: 0, padding: 0 }}
      >
        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.15s"
            isHoveringComponent={isHovering}
          >
            <FormatColorFillIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.2s"
            isHoveringComponent={isHovering}
          >
            <FormatColorTextIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.25s"
            isHoveringComponent={isHovering}
          >
            <ImageSearchIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.3s"
            isHoveringComponent={isHovering}
          >
            <AutoFixHighIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.35s"
            isHoveringComponent={isHovering}
          >
            <VisibilityIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.4s"
            isHoveringComponent={isHovering}
          >
            <DeleteIcon />
          </ToolIconButton>
        </ToolGridItem>
      </Grid>
      <ToolsColumn isHoveringComponent={isHovering}></ToolsColumn>
    </Parent>
  );
};

export default DraggableUserComponent;
