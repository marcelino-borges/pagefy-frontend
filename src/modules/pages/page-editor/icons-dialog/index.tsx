import { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import strings from "./../../../../localization";
import {
  IconsResult,
  IconsSearchResultsArea,
  ColorPickerIcon,
  SelectedIconButton,
  ColorPickerOverlay,
  WhatsAppButton,
} from "./styles";
import { useForm } from "react-hook-form";
import {
  isCalltoUrlValid,
  isFaxUrlValid,
  isMailtoUrlValid,
  isSmsUrlValid,
  isUrlValid,
} from "../../../../utils/validators/url";
import {
  ComponentType,
  IIconDetails,
  IUserComponent,
} from "../../../../store/user-pages/types";
import CustomTooltip from "../../../components/tooltip";
import theme from "../../../../theme";
import { useDispatch } from "react-redux";
import { addTopComponentInPage } from "../../../../store/user-pages/actions";
import icons, { IIconifyIcon } from "../../../../assets/icons/react-icons";
import { Icon } from "@iconify/react";
import ColorPicker from "./../../../components/color-picker/index";
import { v4 as uuidv4 } from "uuid";
import { isTelUrlValid } from "./../../../../utils/validators/url";
import WhatsappDialog from "../whatsapp-dialog";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const IconsDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { handleSubmit: handleSubmitSearch, register: registerSearch } =
    useForm();
  const { handleSubmit: handleSubmitUrl, register: registerUrl } = useForm();

  const [resultsList, setResultsList] = useState<IIconifyIcon[]>(icons);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [isSearchInvalid, setIsSearchInvalid] = useState<boolean>(false);
  const [isUrlInvalid, setIsUrlInvalid] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [lastSearch, setLastSearch] = useState<string | undefined>();
  const [iconSelected, setIconSelected] = useState<IIconDetails>();
  const [colorSelected, setColorSelected] = useState<string>("black");
  const [url, setUrl] = useState<string>("");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [openWhatsappDialog, setOpenWhatsappDialog] = useState<boolean>(false);

  const searchIcon = (search: string) => {
    const results: IIconifyIcon[] = [];
    icons.forEach((icon: IIconifyIcon) => {
      icon.keywords.forEach((keyword: string) => {
        if (
          keyword.includes(search.toLowerCase()) ||
          search.toLowerCase().includes(keyword)
        ) {
          if (
            !results.find(
              (result: IIconifyIcon) =>
                result.userFriendlyName === icon.userFriendlyName
            )
          )
            results.push(icon);
        }
      });
    });

    if (results.length > 0) setLastSearch(search);
    setResultsList([...results]);
    setShowLoading(false);
  };

  const validateAndSearchOnSubmit = () => {
    if (search === lastSearch) {
      return;
    }

    if (search.length < 1) {
      clearStates();
      return;
    }

    if (search.length < 3) {
      setIsSearchInvalid(true);
      return;
    }

    setShowLoading(true);
    setResultsList(icons);
    searchIcon(search);
    setIconSelected(undefined);
    setColorSelected("black");
  };

  const clearStates = () => {
    setResultsList(icons);
    setLastSearch(undefined);
    setIsSearchInvalid(false);
    setIconSelected(undefined);
    setShowLoading(false);
    setShowColorPicker(false);
    setUrl("");
    setColorSelected("black");
    setSearch("");
    setIsUrlInvalid(false);
  };

  const onSubmitUrl = () => {
    if (!isUrlValid(url)) {
      setIsUrlInvalid(true);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const clearSearchAndStates = () => {
    setSearch("");
    setUrl("");
    clearStates();
  };

  const handleChangeColorComplete = (color: any) => {
    setColorSelected(String(color.hex));
    setShowColorPicker(false);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const onAddIcon = () => {
    setIsUrlInvalid(false);

    if (
      !url.length ||
      (!isUrlValid(url) &&
        !isMailtoUrlValid(url) &&
        !isTelUrlValid(url) &&
        !isSmsUrlValid(url) &&
        !isCalltoUrlValid(url) &&
        !isFaxUrlValid(url))
    ) {
      setIsUrlInvalid(true);
      return;
    }

    if (!pageId || !iconSelected) return;

    const newComponent: IUserComponent = {
      text: undefined,
      url: url,
      style: {
        color: colorSelected,
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: ComponentType.Icon,
      mediaUrl: undefined,
      iconDetails: {
        userFriendlyName: iconSelected.userFriendlyName,
        icon: iconSelected.icon,
      },
    };
    clearSearchAndStates();
    dispatch(addTopComponentInPage(newComponent, pageId));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        clearStates();
        handleClose();
      }}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.tools.icon.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitSearch(validateAndSearchOnSubmit)}>
          <TextField
            {...registerSearch("search")}
            error={isSearchInvalid}
            helperText={isSearchInvalid ? strings.searchIconMinCaracters : ""}
            autoFocus
            label={strings.iconName}
            type="text"
            fullWidth
            variant="outlined"
            style={{ marginTop: "16px", minWidth: "191px" }}
            onChange={(e: any) => {
              const value = e.target.value;
              if (value.length < 1) {
                clearStates();
              }
              setSearch(value);
            }}
            value={search}
            InputProps={{
              endAdornment: (
                <>
                  {search.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={clearSearchAndStates}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <ClearIcon fontSize="medium" color="disabled" />
                      </IconButton>
                    </InputAdornment>
                  )}
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <SearchIcon fontSize="large" color="primary" />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}
          />
        </form>
        <IconsSearchResultsArea container>
          {showLoading && (
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress color="primary" />
            </Grid>
          )}
          {!iconSelected &&
            resultsList.map((icon: IIconifyIcon) => (
              <span key={uuidv4()}>
                {icon.variations.map((variation: string) => (
                  <IconsResult
                    key={variation}
                    onClick={(e: any) => {
                      setIconSelected({
                        userFriendlyName: icon.userFriendlyName,
                        icon: variation,
                      });
                    }}
                  >
                    <Icon icon={variation} />
                  </IconsResult>
                ))}
              </span>
            ))}
          {iconSelected && (
            <form
              onSubmit={handleSubmitUrl(onSubmitUrl)}
              style={{ width: "100%", marginTop: "16px" }}
            >
              <Grid container alignItems="center" wrap="nowrap">
                <CustomTooltip
                  title={strings.colorPicker}
                  leaveDelay={1}
                  placement={"bottom"}
                >
                  <Grid
                    item
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      flexGrow: 0,
                      textAlign: "center",
                    }}
                  >
                    <SelectedIconButton onClick={toggleColorPicker}>
                      <Icon
                        icon={iconSelected.icon}
                        style={{
                          width: "56px",
                          height: "56px",
                          marginRight: "16px",
                          color: colorSelected,
                          zIndex: "10",
                        }}
                      />
                      <ColorPickerOverlay>
                        <ColorPickerIcon />
                      </ColorPickerOverlay>
                    </SelectedIconButton>
                    {showColorPicker && (
                      <ColorPicker
                        color={colorSelected}
                        onChangeComplete={handleChangeColorComplete}
                        onCancel={() => setShowColorPicker(false)}
                      />
                    )}
                  </Grid>
                </CustomTooltip>
                <Grid item style={{ flexGrow: 1 }}>
                  <TextField
                    {...registerUrl("url")}
                    error={isUrlInvalid}
                    helperText={isUrlInvalid ? strings.invalidUrl : ""}
                    autoFocus
                    required
                    placeholder={`URL ${strings.or} "mailto:" ${strings.or} "tel:"`}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e: any) => setUrl(e.target.value)}
                    value={url}
                    sx={{ minWidth: "100px", transform: "translateY(-3px)" }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {url.length > 0 && (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={clearSearchAndStates}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                <ClearIcon fontSize="medium" color="disabled" />
                              </IconButton>
                            </InputAdornment>
                          )}
                        </>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" mt="16px">
                {iconSelected.userFriendlyName
                  .toLowerCase()
                  .includes("whatsapp") && (
                  <WhatsAppButton
                    onClick={() => {
                      setOpenWhatsappDialog(true);
                    }}
                  >
                    <WhatsAppIcon color="primary" />
                    {strings.mountWhatsappURL}
                  </WhatsAppButton>
                )}
              </Grid>
              <Grid container style={{ marginTop: "16px" }}>
                <Grid container item xs={1}></Grid>
                <Grid container item xs={11}></Grid>
              </Grid>
            </form>
          )}
        </IconsSearchResultsArea>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearStates();
            handleClose();
          }}
        >
          {strings.back}
        </Button>
        <Button
          onClick={() => {
            onAddIcon();
          }}
        >
          {strings.create}
        </Button>
      </DialogActions>
      <WhatsappDialog
        open={openWhatsappDialog}
        handleClose={() => setOpenWhatsappDialog(false)}
        onMountUrl={(url: string) => {
          setUrl(url);
        }}
      />
    </Dialog>
  );
};

export default IconsDialog;
