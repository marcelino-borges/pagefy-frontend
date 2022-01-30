import { DraggableUserComponentProps } from "../interfaces";
import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
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
  AnalyticsGridItem,
  AnalyticsGridContainer,
  ContentRow,
} from "./style";
import { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Link as LinkIcon,
  FormatColorFill as FormatColorFillIcon,
  FormatColorText as FormatColorTextIcon,
  ImageSearch as ImageSearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  AutoFixHigh as AutoFixHighIcon,
  TableRows as TableRowsIcon,
  ViewColumn as ViewColumnIcon,
  TouchApp as TouchAppIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { PRIMARY_COLOR } from "../../../../../styles/colors";
import {
  getLocalizedStringByComponentType,
  stringShortener,
} from "../../../../../utils";
import CustomTooltip from "../../../../components/tooltip";
import strings from "../../../../../localization";
import TransparentTextField from "../../../../components/transparent-textfield";
import { useForm } from "react-hook-form";

const DraggableUserComponent = ({
  item: component,
  itemSelected,
  dragHandleProps,
}: DraggableUserComponentProps) => {
  const {
    register: registerLabel,
    handleSubmit: handleSubmitLabel,
    setValue: setValueLabel,
  } = useForm();
  const {
    register: registerUrl,
    handleSubmit: handleSubmitUrl,
    setValue: setValueUrl,
  } = useForm();

  const theme = useTheme();

  const isLargerThanMD = useMediaQuery(theme.breakpoints.up("md"));

  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEdittingLabel, setIsEdittingLabel] = useState<boolean>(false);
  const [isEdittingUrl, setIsEdittingUrl] = useState<boolean>(false);

  useEffect(() => {
    setIsBeingDragged(itemSelected !== 0);
  }, [itemSelected]);

  useEffect(() => {
    if (isBeingDragged) console.log(`${component.label} moving`);
  }, [isBeingDragged]);

  const AnalyticsItem = ({ tooltipKey, tooltipValue, icon }: any) => {
    return (
      <AnalyticsGridItem item alignItems="center">
        <CustomTooltip leaveDelay={1} title={`${tooltipKey}: ${tooltipValue}`}>
          {icon}
        </CustomTooltip>
      </AnalyticsGridItem>
    );
  };

  const onSubmitLabelForm = ({ name }: any) => {
    if (!component._id) return;
    setIsEdittingLabel(false);
    //dispatch(updateUserPageName(page._id, name));
  };

  const onSubmitUrlForm = ({ name }: any) => {
    if (!component._id) return;
    setIsEdittingLabel(false);
    //dispatch(updateUserPageName(page._id, name));
  };

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
        wrap="nowrap"
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
        <Grid container item xs={11}>
          {/* 1st content column */}
          <Grid
            container
            item
            xs={12}
            md={9}
            justifyContent="center"
            direction="column"
            spacing={2}
          >
            {/* Label */}
            <ContentRow container item alignItems="center">
              {isEdittingLabel ? (
                <form onSubmit={handleSubmitLabel(onSubmitLabelForm)}>
                  <LabelText item>
                    <TransparentTextField
                      autoFocus
                      register={registerLabel("label")}
                      InputProps={{
                        style: {
                          width: `100%`,
                        },
                      }}
                      onBlur={() => {
                        setValueLabel("label", component.label);
                        setIsEdittingLabel(false);
                      }}
                    />
                  </LabelText>
                </form>
              ) : (
                <LabelText item onClick={() => setIsEdittingLabel(true)}>
                  {stringShortener(component.label, isLargerThanMD ? 50 : 20)}
                </LabelText>
              )}
              <EditIconItem item onClick={() => setIsEdittingLabel(true)}>
                <EditIcon />
              </EditIconItem>
            </ContentRow>

            {/* URL */}
            <ContentRow container item alignItems="center">
              <UrlIconItem item>
                <LinkIcon />
              </UrlIconItem>
              {isEdittingUrl ? (
                <form onSubmit={handleSubmitUrl(onSubmitUrlForm)}>
                  <LabelText item>
                    <TransparentTextField
                      autoFocus
                      register={registerUrl("url")}
                      onBlur={() => {
                        setValueUrl("url", component.url);
                        setIsEdittingUrl(false);
                      }}
                    />
                  </LabelText>
                </form>
              ) : (
                <UrlTextItem item onClick={() => setIsEdittingUrl(true)}>
                  {stringShortener(component.url, isLargerThanMD ? 50 : 20)}
                </UrlTextItem>
              )}
              <EditIconItem item>
                <EditIcon />
              </EditIconItem>
            </ContentRow>
          </Grid>

          {/* 2nd content column */}
          {/* Analytics */}
          <AnalyticsGridContainer
            container
            item
            xs={12}
            md={3}
            alignItems={isLargerThanMD ? "flex-end" : "center"}
            direction={isLargerThanMD ? "column" : "row"}
            justifyContent="center"
            spacing={1}
          >
            <AnalyticsItem
              tooltipKey={strings.columns}
              tooltipValue={component.layout.columns.toString()}
              icon={<ViewColumnIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.rows}
              tooltipValue={component.layout.rows.toString()}
              icon={<TableRowsIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.clicks}
              tooltipValue={component.type.toString()}
              icon={<TouchAppIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.type}
              tooltipValue={getLocalizedStringByComponentType(component.type)}
              icon={<CategoryIcon />}
            />
          </AnalyticsGridContainer>
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
      >
        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.25s"
            isHoveringComponent={isHovering}
          >
            <FormatColorFillIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.3s"
            isHoveringComponent={isHovering}
          >
            <FormatColorTextIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.35s"
            isHoveringComponent={isHovering}
          >
            <ImageSearchIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.4s"
            isHoveringComponent={isHovering}
          >
            <AutoFixHighIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.45s"
            isHoveringComponent={isHovering}
          >
            <VisibilityIcon />
          </ToolIconButton>
        </ToolGridItem>

        <ToolGridItem item>
          <ToolIconButton
            transitionDuration="0.5s"
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
