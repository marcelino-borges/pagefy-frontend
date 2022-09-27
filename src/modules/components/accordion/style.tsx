import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { PRIMARY_COLOR } from "./../../../styles/colors";

const getBorderRadius = (position: "first" | "middle" | "last") => {
  if (position === "first") {
    return "8px 8px 0px 0px";
  } else if (position === "middle") {
    return "0px";
  } else {
    return "0px 0px 8px 8px";
  }
};

export const CustomAccordion = styled(
  (props: AccordionProps & { position: "first" | "middle" | "last" }) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  )
)(({ position }) => ({
  border: `1px solid ${PRIMARY_COLOR}`,
  borderRadius: getBorderRadius(position),
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

export const CustomAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${PRIMARY_COLOR}`,
    backgroundColor: "#f0f0f0",
  })
);
