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
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import strings from "./../../../../localization/index";
import {
  IconsResult,
  IconsSearchResultsArea,
  ColorizeIcon,
  SelectedIconButton,
  ColorPickerSpan,
  ColorizeBG,
} from "./styles";
import { useForm } from "react-hook-form";
import { isUrlValid } from "../../../../utils/validators/url";
import {
  ComponentType,
  IIconDetails,
  IUserComponent,
} from "../../../../store/user/types";
import { SketchPicker } from "react-color";
import CustomTooltip from "../../../components/tooltip";
import theme from "../../../../theme";
import { useDispatch } from "react-redux";
import { addComponentInPage } from "../../../../store/user/actions";
import { v4 as uuidv4 } from "uuid";
import iconPacks, { IIconPack } from "../../../../assets/icons/react-icons";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

interface IIconDetailsForResults {
  Html: any;
  color: string;
}

const IconsDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { handleSubmit: handleSubmitSearch, register: registerSearch } =
    useForm();
  const { handleSubmit: handleSubmitUrl, register: registerUrl } = useForm();

  const [resultsList, setResultsList] = useState<
    (IIconDetailsForResults & IIconDetails)[]
  >([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [isSearchInvalid, setIsSearchInvalid] = useState<boolean>(false);
  const [isUrlInvalid, setIsUrlInvalid] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [lastSearch, setLastSearch] = useState<string | undefined>();
  const [IconSelected, setIconSelected] = useState<
    IIconDetailsForResults & IIconDetails
  >();
  const [url, setUrl] = useState<string>("");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const searchIcon = (search: string) => {
    const results: (IIconDetailsForResults & IIconDetails)[] = [];

    iconPacks.forEach((iconPack: IIconPack) => {
      const packIcons = Object.values(iconPack.pack);

      packIcons.forEach((Icon: any, index: number) => {
        if (Icon.name.toLowerCase().includes(search.toLowerCase())) {
          const iconDetail: IIconDetailsForResults & IIconDetails = {
            packName: iconPack.name,
            nameInPack: Icon.name,
            indexInPack: index,
            Html: Icon,
            color: "black",
          };
          results.push(iconDetail);
        }
      });
    });
    setLastSearch(search);
    setResultsList([...results]);
    setShowLoading(false);
  };

  const onSubmitSearch = () => {
    if (search === lastSearch) {
      return;
    }

    if (search.length < 1) {
      setResultsList([]);
      return;
    }

    if (search.length < 3) {
      setIsSearchInvalid(true);
      return;
    }

    setShowLoading(true);
    setResultsList([]);
    searchIcon(search);
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

  const clearSearch = () => {
    setSearch("");
    clearStates();
  };

  const clearStates = () => {
    setResultsList([]);
    setLastSearch(undefined);
    setIsSearchInvalid(false);
    setIconSelected(undefined);
    setShowLoading(false);
  };

  const handleChangeColorComplete = (color: any) => {
    const updateIcon: any = { ...IconSelected, color: color.hex };
    setIconSelected(updateIcon);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const onAddIcon = () => {
    setIsUrlInvalid(false);

    if (!isUrlValid(url)) {
      setIsUrlInvalid(true);
    }

    if (!pageId || !IconSelected) return;

    const newComponent: IUserComponent = {
      _id: uuidv4(),
      label: undefined,
      url,
      style: {
        color: IconSelected?.color,
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
        packName: IconSelected.packName,
        nameInPack: IconSelected.nameInPack,
        indexInPack: IconSelected.indexInPack,
      },
    };
    clearSearch();
    dispatch(addComponentInPage(newComponent, pageId));
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
      <DialogTitle>{strings.addIcon}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitSearch(onSubmitSearch)}>
          <TextField
            {...registerSearch("search")}
            error={isSearchInvalid}
            helperText={isSearchInvalid ? strings.searchIconMinCaracters : ""}
            autoFocus
            label={strings.iconName}
            type="text"
            fullWidth
            required
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
                        onClick={clearSearch}
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
          {!IconSelected &&
            resultsList.map(
              (Icon: IIconDetailsForResults & IIconDetails, index: number) => (
                <IconsResult
                  key={index}
                  onClick={(e: any) => {
                    setIconSelected(Icon);
                  }}
                  style={{ color: Icon.color }}
                >
                  <Icon.Html />
                </IconsResult>
              )
            )}
          {IconSelected && (
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
                      <IconSelected.Html
                        style={{
                          fontSize: "56px",
                          marginRight: "16px",
                          color: IconSelected.color,
                          zIndex: "10",
                        }}
                      />
                      <ColorizeBG>
                        <ColorizeIcon />
                      </ColorizeBG>
                    </SelectedIconButton>
                    {showColorPicker && (
                      <ColorPickerSpan>
                        <SketchPicker
                          color={IconSelected.color}
                          onChangeComplete={handleChangeColorComplete}
                        />
                      </ColorPickerSpan>
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
                    // label={strings.url}
                    placeholder="https://www.mywebsite.com"
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
                                onClick={clearSearch}
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
              <Grid container style={{ marginTop: "16px" }}>
                <Grid container item xs={1}></Grid>
                <Grid container item xs={11}></Grid>
              </Grid>
            </form>
          )}
        </IconsSearchResultsArea>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          onClick={() => {
            handleClose();
            onAddIcon();
          }}
        >
          {strings.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IconsDialog;
