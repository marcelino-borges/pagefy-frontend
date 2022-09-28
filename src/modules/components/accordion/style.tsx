import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./../../../styles/colors";

type IAccordionPosition = "first" | "middle" | "last";

const getTitleBorderRadius = (position: IAccordionPosition) => {
  if (position === "first") {
    return "8px 8px 0px 0px";
  } else if (position === "middle") {
    return "0px";
  } else {
    return "0px 0px 8px 8px";
  }
};

const getContentBorderRadius = (position: IAccordionPosition) => {
  if (position === "last") {
    return "0px 0px 8px 8px";
  } else {
    return "0px";
  }
};

const getLinearGradient = (alpha: number) =>
  `linear-gradient(to right, ${PRIMARY_COLOR + alpha}, ${
    SECONDARY_COLOR + alpha
  })`;

export const CustomAccordion = styled(
  (props: AccordionProps & { position: IAccordionPosition }) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  )
)(({ position, expanded }) => ({
  border: `1px solid ${PRIMARY_COLOR}`,
  borderBottom: "15px",
  borderRadius: getTitleBorderRadius(position),
  backgroundImage: expanded ? getLinearGradient(80) : "",
  "&:hover": {
    backgroundImage: getLinearGradient(30),
  },
  "&:last-child": {
    borderBottom: `${
      position === "last" ? "1px" : "0px"
    } solid ${PRIMARY_COLOR}`,
  },
  "&:before": {
    display: "none",
  },
}));

export const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(2),
  },
}));

export const CustomAccordionDetails = styled(
  (props: AccordionDetailsProps & { position: IAccordionPosition }) => (
    <MuiAccordionDetails {...props} />
  )
)(({ theme, position }) => ({
  borderRadius: getContentBorderRadius(position),
  padding: theme.spacing(2),
  borderTop: `1px solid ${PRIMARY_COLOR}`,
  backgroundColor: "#ffffff",
  color: "#000",
}));
