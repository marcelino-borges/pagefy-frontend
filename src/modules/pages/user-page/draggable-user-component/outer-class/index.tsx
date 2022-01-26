import React from "react";
import DraggableUserComponent from "../inner-func-component";
import { DraggableUserComponentProps } from "../interfaces";

class DraggableUserComponentClass extends React.Component<DraggableUserComponentProps> {
  render(): React.ReactNode {
    return <DraggableUserComponent {...this.props} />;
  }
}

export default DraggableUserComponentClass;
