import { IUserComponent } from "../../../../store/user/types";

export interface DraggableUserComponentProps {
  item: IUserComponent;
  itemSelected: number;
  dragHandleProps: object;
}
