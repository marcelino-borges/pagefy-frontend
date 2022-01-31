import { DraggableUserComponentProps } from "../interfaces";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
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
  FormatColorFill as BackgroundColorIcon,
  FormatColorText as FontColorIcon,
  ImageSearch as ImageSearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Delete as DeleteIcon,
  AutoFixHigh as ChooseEffectsIcon,
  TableRows as RowsIcon,
  ViewColumn as ColumnsIcon,
  TouchApp as ClicksCountIcon,
  Category as ComponentTypeIcon,
  ContactPageOutlined,
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
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../../../store";
import {
  deleteComponentFromPage,
  setComponentLabel,
  setComponentUrl,
  toggleComponentVisibility,
} from "../../../../../store/user/actions";
import { clearPageBeingManaged } from "../../../../../store/page-management/actions";

const DraggableUserComponent = ({
  item: component,
  itemSelected,
  dragHandleProps,
}: DraggableUserComponentProps) => {
  const dispatch = useDispatch();
  const { handleSubmit: handleSubmitLabel } = useForm();
  const { handleSubmit: handleSubmitUrl } = useForm();

  const theme = useTheme();
  const isLargerThanMD = useMediaQuery(theme.breakpoints.up("md"));

  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEdittingLabel, setIsEdittingLabel] = useState<boolean>(false);
  const [isEdittingUrl, setIsEdittingUrl] = useState<boolean>(false);
  const [values, setValues] = useState({
    label: component.label || "",
    url: component.url,
  });

  const pageBeingManaged = useSelector(
    (state: IApplicationState) => state.pageManagement.pageId
  );

  useEffect(() => {
    setIsBeingDragged(itemSelected !== 0);

    return () => {
      dispatch(clearPageBeingManaged());
    };
  }, [dispatch, itemSelected]);

  const AnalyticsItem = ({ tooltipKey, tooltipValue, icon }: any) => {
    return (
      <AnalyticsGridItem item alignItems="center">
        <CustomTooltip
          leaveDelay={1}
          title={`${tooltipKey}: ${tooltipValue}`}
          placement={isLargerThanMD ? "left" : "bottom"}
        >
          {icon}
        </CustomTooltip>
      </AnalyticsGridItem>
    );
  };

  const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, label: event.target.value });
  };

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, url: event.target.value });
  };

  const onSubmitLabelForm = () => {
    if (!component._id || !pageBeingManaged) return;
    setIsEdittingLabel(false);
    dispatch(setComponentLabel(pageBeingManaged, component._id, values.label));
  };

  const onSubmitUrlForm = () => {
    if (!component._id || !pageBeingManaged) return;
    setIsEdittingUrl(false);
    dispatch(setComponentUrl(pageBeingManaged, component._id, values.url));
  };

  const deleteComponent = () => {
    if (!component._id || !pageBeingManaged) return;
    dispatch(deleteComponentFromPage(pageBeingManaged, component._id));
  };

  const toggleVisibility = () => {
    if (!component._id || !pageBeingManaged) return;
    dispatch(toggleComponentVisibility(pageBeingManaged, component._id));
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
            {component.label && component.label.length > 0 && (
              <ContentRow container item alignItems="center">
                {isEdittingLabel ? (
                  <form onSubmit={handleSubmitLabel(onSubmitLabelForm)}>
                    <LabelText item>
                      <TransparentTextField
                        autoFocus
                        InputProps={{
                          style: {
                            width: `100%`,
                          },
                        }}
                        onChange={handleChangeLabel}
                        value={values.label}
                        onBlur={() => {
                          setValues({
                            ...values,
                            label: component.label || "",
                          });
                          setIsEdittingLabel(false);
                        }}
                      />
                    </LabelText>
                  </form>
                ) : (
                  <LabelText
                    item
                    onClick={() => {
                      setIsEdittingLabel(true);
                      setValues({ ...values, label: component.label || "" });
                    }}
                  >
                    {stringShortener(component.label, isLargerThanMD ? 50 : 20)}
                  </LabelText>
                )}
                <EditIconItem item onClick={() => setIsEdittingLabel(true)}>
                  <EditIcon />
                </EditIconItem>
              </ContentRow>
            )}

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
                      onChange={handleChangeUrl}
                      value={values.url}
                      fontWeight="300"
                      color="#bfbfbf"
                      fontSize="22px"
                      fontStyle="italic"
                      InputProps={{
                        style: {
                          width: "100%",
                          margin: "0px 16px",
                        },
                      }}
                      onBlur={() => {
                        setValues({ ...values, url: component.url || "" });
                        setIsEdittingUrl(false);
                      }}
                    />
                  </LabelText>
                </form>
              ) : (
                <UrlTextItem
                  item
                  onClick={() => {
                    setIsEdittingUrl(true);
                    setValues({ ...values, url: component.url || "" });
                  }}
                >
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
              icon={<ColumnsIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.rows}
              tooltipValue={component.layout.rows.toString()}
              icon={<RowsIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.clicks}
              tooltipValue={component.type.toString()}
              icon={<ClicksCountIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.type}
              tooltipValue={getLocalizedStringByComponentType(component.type)}
              icon={<ComponentTypeIcon />}
            />
          </AnalyticsGridContainer>
        </Grid>
      </Container>

      {/* Tools column */}
      {!isBeingDragged && (
        <Grid
          container
          item
          xs={2}
          sm={1}
          justifyContent="space-between"
          alignItems="stretch"
          direction="column"
        >
          <CustomTooltip
            disableInteractive
            leaveDelay={0.1}
            title={strings.backgroundColor}
            placement={isLargerThanMD ? "right" : "bottom"}
          >
            <ToolGridItem item>
              <ToolIconButton
                transitionDuration="0.25s"
                isHoveringComponent={isHovering}
              >
                <BackgroundColorIcon />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>

          <CustomTooltip
            disableInteractive
            leaveDelay={0.1}
            title={strings.fontColor}
            placement={isLargerThanMD ? "right" : "bottom"}
          >
            <ToolGridItem item>
              <ToolIconButton
                transitionDuration="0.3s"
                isHoveringComponent={isHovering}
              >
                <FontColorIcon />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>

          <CustomTooltip
            disableInteractive
            leaveDelay={0.1}
            title={strings.uploadImage}
            placement={isLargerThanMD ? "right" : "bottom"}
          >
            <ToolGridItem item>
              <ToolIconButton
                transitionDuration="0.35s"
                isHoveringComponent={isHovering}
              >
                <ImageSearchIcon />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>

          <CustomTooltip
            disableInteractive
            leaveDelay={0.1}
            title={strings.chooseEffect}
            placement={isLargerThanMD ? "right" : "bottom"}
          >
            <ToolGridItem item>
              <ToolIconButton
                transitionDuration="0.4s"
                isHoveringComponent={isHovering}
              >
                <ChooseEffectsIcon />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>

          <CustomTooltip
            disableInteractive
            leaveDelay={0.1}
            title={strings.toggleVisibility}
            placement={isLargerThanMD ? "right" : "bottom"}
          >
            <ToolGridItem item>
              <ToolIconButton
                transitionDuration="0.45s"
                isHoveringComponent={isHovering}
                onClick={() => toggleVisibility()}
              >
                {component.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>

          <CustomTooltip
            disableInteractive
            leaveDelay={0.1}
            title={strings.remove}
            placement={isLargerThanMD ? "right" : "bottom"}
          >
            <ToolGridItem item>
              <ToolIconButton
                transitionDuration="0.5s"
                isHoveringComponent={isHovering}
                onClick={() => deleteComponent()}
              >
                <DeleteIcon />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>
        </Grid>
      )}
      <ToolsColumn isHoveringComponent={isHovering}></ToolsColumn>
    </Parent>
  );
};

export default DraggableUserComponent;
