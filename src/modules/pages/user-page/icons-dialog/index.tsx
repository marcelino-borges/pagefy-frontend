import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import strings from "./../../../../localization/index";
import { IconsResult, IconsSearchResultsArea } from "./styles";
import { useEffect, useState } from "react";
import * as ai from "react-icons/ai";
import * as bs from "react-icons/bs";
import * as bi from "react-icons/bi";
import * as di from "react-icons/di";
import * as fi from "react-icons/fi";
import * as fc from "react-icons/fc";
import * as fa from "react-icons/fa";
import * as gi from "react-icons/gi";
import * as go from "react-icons/go";
import * as gr from "react-icons/gr";
import * as hi from "react-icons/hi";
import * as im from "react-icons/im";
import * as io from "react-icons/io";
import * as io5 from "react-icons/io5";
import * as md from "react-icons/md";
import * as ri from "react-icons/ri";
import * as si from "react-icons/si";
import * as ti from "react-icons/ti";
import * as vsc from "react-icons/vsc";
import * as wi from "react-icons/wi";
import * as cg from "react-icons/cg";
import { useForm } from "react-hook-form";

const iconPacks = [
  ai,
  bs,
  bi,
  di,
  fi,
  fc,
  fa,
  gi,
  go,
  gr,
  hi,
  im,
  io,
  io5,
  md,
  ri,
  si,
  ti,
  vsc,
  wi,
  cg,
];

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const IconsDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const { handleSubmit: handleSubmitSearch, register } = useForm();
  const [resultsList, setResultsList] = useState<any[]>([]);

  const searchIcon = (search: string) => {
    setResultsList([]);
    const results: any[] = [];

    iconPacks.forEach((pack: any, packIndex: number) => {
      const packIcons = Object.values(pack);

      packIcons.forEach((Icon: any, index: number) => {
        if (Icon.name.toLowerCase().includes(search.toLowerCase())) {
          results.push(Icon);
          console.log("Icon found: " + Icon.name);
        }
      });
    });
    setResultsList([...results]);
  };

  const onSubmitSearch = (data: any) => {
    const { search } = data;
    searchIcon(search);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{strings.addIcon}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitSearch(onSubmitSearch)}>
          <TextField
            autoFocus
            label={strings.iconName}
            type="text"
            fullWidth
            variant="outlined"
            style={{ marginTop: "16px" }}
            {...register("search")}
          />
        </form>
        <IconsSearchResultsArea container>
          {resultsList.map((Icon: any, index: number) => (
            <IconsResult key={index}>
              <Icon />
            </IconsResult>
          ))}
        </IconsSearchResultsArea>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button onClick={handleClose}>{strings.add}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IconsDialog;
