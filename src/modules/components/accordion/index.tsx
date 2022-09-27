import Typography from "@mui/material/Typography";
import React from "react";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "./style";

interface IAccordionProps {
  expanded: boolean;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => void;
  title: string;
  content: any;
  id: string;
  position: "first" | "middle" | "last";
}

const Accordion = ({
  expanded,
  onChange,
  title,
  content,
  id,
  position,
}: IAccordionProps) => {
  return (
    <div>
      <CustomAccordion
        expanded={expanded}
        onChange={onChange}
        position={position}
      >
        <CustomAccordionSummary
          aria-controls={id + "-content"}
          id={id + "-header"}
        >
          <Typography>{title}</Typography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <Typography>{content}</Typography>
        </CustomAccordionDetails>
      </CustomAccordion>
    </div>
  );
};

export default Accordion;
