import { IUserComponent } from "../../../store/user-pages/types";

export const shouldComponentBeVisible = (comp: IUserComponent) =>
  comp.visible &&
  (!comp.visibleDate || new Date(comp.visibleDate) >= new Date());
