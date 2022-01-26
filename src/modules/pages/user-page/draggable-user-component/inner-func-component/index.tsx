import { DraggableUserComponentProps } from "../interfaces";
import { Grid } from "@mui/material";
import { DragHandle, Parent } from "./style";
import { useEffect, useState } from "react";

const DraggableUserComponent = ({
  item,
  itemSelected,
  dragHandleProps,
}: DraggableUserComponentProps) => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

  useEffect(() => {
    setIsBeingDragged(itemSelected !== 0);
  }, [itemSelected]);

  useEffect(() => {
    if (isBeingDragged) console.log(`${item.label} moving`);
  }, [isBeingDragged]);

  return (
    <Parent container item direction="row">
      <Grid item xs={1}>
        <DragHandle {...dragHandleProps} />
      </Grid>
      <Grid item xs={11}>{`componente ${item.label} `}</Grid>
    </Parent>
  );
};

export default DraggableUserComponent;
