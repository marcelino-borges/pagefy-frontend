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

export interface IIconPack {
  name: string;
  pack: any;
}

const iconPacks: IIconPack[] = [
  { name: "ai", pack: ai },
  { name: "bs", pack: bs },
  { name: "bi", pack: bi },
  { name: "di", pack: di },
  { name: "fi", pack: fi },
  { name: "fc", pack: fc },
  { name: "fa", pack: fa },
  { name: "gi", pack: gi },
  { name: "go", pack: go },
  { name: "gr", pack: gr },
  { name: "hi", pack: hi },
  { name: "im", pack: im },
  { name: "io", pack: io },
  { name: "io5", pack: io5 },
  { name: "md", pack: md },
  { name: "ri", pack: ri },
  { name: "si", pack: si },
  { name: "ti", pack: ti },
  { name: "vsc", pack: vsc },
  { name: "wi", pack: wi },
  { name: "cg", pack: cg },
];

export default iconPacks;
