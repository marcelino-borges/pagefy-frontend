import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery } from "@mui/material";
import {
  Link as LinkIcon,
  ImageSearch as ImageSearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Delete as DeleteIcon,
  AutoFixHigh as ChooseEffectsIcon,
  TableRows as RowsIcon,
  ViewColumn as ColumnsIcon,
  TouchApp as ClicksCountIcon,
  Category as ComponentTypeIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import {
  Parent,
  Container,
  Overlay,
  LabelText,
  UrlIconItem,
  UrlTextItem,
  ToolsColumn,
  ToolIconButton,
  ToolGridItem,
  AnalyticsGridItem,
  AnalyticsGridContainer,
  ContentRow,
  DarkBG,
  ComponentArrowGridItem,
  ColorPickerSpan,
  DeleteContainer,
} from "./style";
import { PRIMARY_COLOR } from "../../../../styles/colors";
import {
  getLocalizedStringByComponentType,
  stringShortener,
} from "../../../../utils";
import CustomTooltip from "../../../components/tooltip";
import strings from "../../../../localization";
import TransparentTextField from "../../../components/transparent-textfield";
import { IApplicationState } from "../../../../store";
import {
  decreaseComponentIndexInPage,
  deleteMiddleComponentFromPage,
  increaseComponentIndexInPage,
  setComponentBackgroundColor,
  setComponentFontColor,
  setComponentLabel,
  setComponentUrl,
  toggleComponentVisibility,
} from "../../../../store/user/actions";
import { ComponentType, IUserComponent } from "../../../../store/user/types";
import { SketchPicker } from "react-color";
import BackgroundColorIcon from "../../../../assets/icons/custom-icons/background-color";
import FontColorIcon from "../../../../assets/icons/custom-icons/font-color";
import ChooseFileDialog from "../../../components/dialog-file-upload";
import { IMAGE_EXTENSIONS } from "../../../constants";
import DialogConfirmation from "../../../components/dialog-confirmation";

export interface DraggableUserComponentProps {
  component: IUserComponent;
  index: number;
  pageId: string;
  onClick?: () => any;
}

const DraggableUserComponent = ({
  component,
  index,
  pageId,
  onClick,
}: DraggableUserComponentProps) => {
  const dispatch = useDispatch();

  const { handleSubmit: handleSubmitLabel } = useForm();
  const { handleSubmit: handleSubmitUrl } = useForm();

  const isLargerThan400 = useMediaQuery("(min-width: 400px)");
  const isSmallerThan400 = useMediaQuery("(max-width: 399px)");
  const isSmallerThan600 = useMediaQuery("(max-width: 600px)");

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isKeepToolsOpen, setIsKeepToolsOpen] = useState<boolean>(false);
  const [isEdittingLabel, setIsEdittingLabel] = useState<boolean>(false);
  const [isEdittingUrl, setIsEdittingUrl] = useState<boolean>(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [values, setValues] = useState({
    label: component.text || "",
    url: component.url,
  });
  const [openChooseFileDialog, setOpenChooseFileDialog] = useState(false);
  const [chosenImage, setChosenImage] = useState();
  const [openDeleteComponentConfirmation, setOpenDeleteComponentConfirmation] =
    useState(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const pageBeingManaged = useSelector(
    (state: IApplicationState) => state.pageManagement.pageId
  );

  const AnalyticsItem = ({ tooltipKey, tooltipValue, icon }: any) => {
    return (
      <AnalyticsGridItem item alignItems="center">
        <CustomTooltip
          leaveDelay={1}
          placement={isSmallerThan400 ? "bottom" : "left"}
          title={`${tooltipKey}: ${tooltipValue}`}
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
    setIsDeleted(true);
    setTimeout(() => {
      if (!component._id || !pageBeingManaged) return;
      dispatch(deleteMiddleComponentFromPage(component._id, pageBeingManaged));
    }, 250);
  };

  const toggleVisibility = () => {
    if (!component._id || !pageBeingManaged) return;
    dispatch(toggleComponentVisibility(pageBeingManaged, component._id));
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    if (component._id) {
      dispatch(
        setComponentBackgroundColor(pageId, component._id, String(color.hex))
      );
      setIsKeepToolsOpen(false);
    }
  };

  const handleChangeFontColorComplete = (color: any) => {
    if (component._id) {
      dispatch(setComponentFontColor(pageId, component._id, String(color.hex)));
      setIsKeepToolsOpen(false);
    }
  };

  const DeleteComponentConfirmationDialog = () => {
    return (
      <DialogConfirmation
        open={openDeleteComponentConfirmation}
        onClose={() => {
          setOpenDeleteComponentConfirmation(false);
        }}
        onConfirmCallback={() => {
          deleteComponent();
        }}
        title={strings.deleteIcon}
        message={strings.deleteComponentConfirmation}
      />
    );
  };

  return (
    <Parent
      container
      item
      direction="row"
      wrap="nowrap"
      onMouseLeave={() => {
        if (!isKeepToolsOpen) setIsHovering(false);
      }}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {isDeleted && <DeleteContainer />}

      <DeleteComponentConfirmationDialog />
      <ChooseFileDialog
        openChooseFileDialog={openChooseFileDialog}
        setOpenChooseFileDialog={setOpenChooseFileDialog}
        chosenImage={chosenImage}
        setChosenImage={setChosenImage}
        acceptedFiles={IMAGE_EXTENSIONS}
        submitDialog={() => {
          if (!chosenImage) return;
          // TODO: Send file
          setOpenChooseFileDialog(false);
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenChooseFileDialog(false);
        }}
      />
      <Container
        container
        item
        isHoveringComponent={isHovering}
        direction="row"
        onMouseOver={() => setIsHovering(true)}
        xs={10}
        md={11}
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
        <Grid
          container
          item
          xs={1}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
        >
          <ComponentArrowGridItem
            item
            up
            onClick={() =>
              dispatch(decreaseComponentIndexInPage(index, pageId))
            }
          >
            <KeyboardArrowUpIcon />
          </ComponentArrowGridItem>
          <ComponentArrowGridItem
            item
            down
            onClick={() =>
              dispatch(increaseComponentIndexInPage(index, pageId))
            }
          >
            <KeyboardArrowDownIcon />
          </ComponentArrowGridItem>
        </Grid>

        {/* Content */}
        <Grid
          container
          item
          xs={11}
          direction={isSmallerThan600 ? "column" : "row"}
          justifyContent="center"
          wrap="nowrap"
        >
          {/* 1st content column */}
          <Grid
            container
            item
            xs={12}
            sm={9}
            justifyContent="center"
            direction="column"
            spacing={2}
            style={{
              maxHeight: isSmallerThan400 ? "100px" : "unset",
            }}
          >
            {/* Label */}
            {component.text && component.text.length > 0 && (
              <ContentRow container item alignItems="center" wrap="nowrap">
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
                        fontSize={isSmallerThan600 ? "16px" : "24px"}
                        onBlur={() => {
                          onSubmitLabelForm();
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
                      setValues({ ...values, label: component.text || "" });
                    }}
                  >
                    {stringShortener(component.text, isLargerThan400 ? 50 : 20)}
                  </LabelText>
                )}
              </ContentRow>
            )}

            {/* URL */}
            <ContentRow container item alignItems="center" wrap="nowrap">
              {!isSmallerThan400 && (
                <UrlIconItem item>
                  <LinkIcon />
                </UrlIconItem>
              )}
              {isEdittingUrl ? (
                <Grid container item>
                  <form
                    onSubmit={handleSubmitUrl(onSubmitUrlForm)}
                    style={{ width: "100%" }}
                  >
                    <LabelText item>
                      <TransparentTextField
                        autoFocus
                        onChange={handleChangeUrl}
                        value={values.url}
                        fontWeight="300"
                        color="#bfbfbf"
                        fontStyle="italic"
                        InputProps={{
                          style: {
                            width: "100%",
                            margin: !isSmallerThan400 ? "0px 16px" : "0",
                          },
                        }}
                        fontSize={isSmallerThan600 ? "16px" : "22px"}
                        onBlur={() => {
                          onSubmitUrlForm();
                          setIsEdittingUrl(false);
                        }}
                      />
                    </LabelText>
                  </form>
                </Grid>
              ) : (
                <UrlTextItem
                  item
                  onClick={() => {
                    setIsEdittingUrl(true);
                    setValues({ ...values, url: component.url || "" });
                  }}
                >
                  {stringShortener(component.url, isLargerThan400 ? 50 : 20)}
                </UrlTextItem>
              )}
            </ContentRow>
          </Grid>

          {/* 2nd content column */}

          {/*
           * Analytics
           */}
          <AnalyticsGridContainer
            container
            item
            xs={12}
            sm={3}
            style={{
              width: isSmallerThan600 ? "100%" : "unset",
              maxHeight: isSmallerThan400 ? "80px" : "unset",
            }}
            alignItems={isSmallerThan600 ? "center" : "flex-end"}
            direction={isSmallerThan600 ? "row" : "column"}
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
      <Grid
        container
        item
        xs={2}
        md={1}
        justifyContent="space-between"
        alignItems="stretch"
        direction="column"
        style={{
          minWidth: "50px",
        }}
      >
        <CustomTooltip
          disabled={!isHovering || showBackgroundColorPicker}
          disableInteractive
          leaveDelay={0.1}
          title={strings.backgroundColor}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              disabled={component.type === ComponentType.Video}
              transitionDuration="0.25s"
              isHoveringComponent={isHovering}
              onClick={() => {
                setShowBackgroundColorPicker(!showBackgroundColorPicker);
                setIsKeepToolsOpen(true);
              }}
            >
              <BackgroundColorIcon
                bucketColor={
                  component.type === ComponentType.Video
                    ? "rgba(0, 0, 0, 0.26)"
                    : "white"
                }
                selectedColor={
                  component.type === ComponentType.Video
                    ? "rgba(0, 0, 0, 0.26)"
                    : component.style?.backgroundColor
                }
              />
            </ToolIconButton>
            {showBackgroundColorPicker && (
              <ColorPickerSpan>
                <SketchPicker
                  color={component.style?.backgroundColor}
                  onChangeComplete={handleChangeBackgroundColorComplete}
                />
              </ColorPickerSpan>
            )}
          </ToolGridItem>
        </CustomTooltip>

        <CustomTooltip
          disabled={!isHovering || showFontColorPicker}
          disableInteractive
          leaveDelay={0.1}
          title={strings.fontColor}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              disabled={component.type === ComponentType.Video}
              transitionDuration="0.3s"
              isHoveringComponent={isHovering}
              onClick={() => {
                setShowFontColorPicker(!showFontColorPicker);
                setIsKeepToolsOpen(true);
              }}
            >
              <FontColorIcon
                bucketColor={
                  component.type === ComponentType.Video
                    ? "rgba(0, 0, 0, 0.26)"
                    : "white"
                }
                selectedColor={
                  component.type === ComponentType.Video
                    ? "rgba(0, 0, 0, 0.26)"
                    : component.style?.color
                }
              />
            </ToolIconButton>
            {showFontColorPicker && (
              <ColorPickerSpan>
                <SketchPicker
                  color={component.style?.color}
                  onChangeComplete={handleChangeFontColorComplete}
                />
              </ColorPickerSpan>
            )}
          </ToolGridItem>
        </CustomTooltip>

        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.uploadImage}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              disabled={component.type === ComponentType.Video}
              hoveringWhite
              transitionDuration="0.35s"
              isHoveringComponent={isHovering}
              onClick={() => {
                setOpenChooseFileDialog(true);
              }}
            >
              <ImageSearchIcon />
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>

        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.chooseEffect}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              disabled={component.type === ComponentType.Video}
              hoveringWhite
              transitionDuration="0.4s"
              isHoveringComponent={isHovering}
            >
              <ChooseEffectsIcon />
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>

        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.toggleVisibility}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              hoveringWhite
              transitionDuration="0.45s"
              isHoveringComponent={isHovering}
              onClick={() => toggleVisibility()}
            >
              {component.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>

        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.remove}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              hoveringWhite
              transitionDuration="0.5s"
              isHoveringComponent={isHovering}
              onClick={() => setOpenDeleteComponentConfirmation(true)}
            >
              <DeleteIcon />
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>
      </Grid>
      <ToolsColumn isHoveringComponent={isHovering}></ToolsColumn>
      <DarkBG />
    </Parent>
  );
};

export default DraggableUserComponent;
