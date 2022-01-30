import { IUserComponent } from "../../../../store/user/types";

export interface DraggableUserComponentProps {
  anySelected: number;
  commonProps: any;
  item: IUserComponent;
  itemSelected: number;
  dragHandleProps: {
    onMouseDown: () => any;
    onTouchStart: () => any;
  };
}
