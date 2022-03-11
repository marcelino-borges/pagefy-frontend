import React from "react";
import { Tooltip } from "@mui/material";

interface ITooltipProps {
  title: string;
  children: any;
  leaveDelay?: number;
  disableInteractive?: boolean;
  placement?: any;
  disabled?: boolean;
}

const CustomTooltip = ({
  title,
  leaveDelay,
  disableInteractive,
  placement,
  children,
  disabled = false,
}: ITooltipProps) => {
  const MyTooltip = React.forwardRef((props, ref) => (
    <Tooltip
      ref={ref}
      title={title}
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      disableHoverListener={disabled}
      leaveDelay={leaveDelay || 100}
      arrow
      disableInteractive={disableInteractive !== undefined}
      placement={placement || "bottom"}
      {...props}
    >
      {children}
    </Tooltip>
  ));
  return <MyTooltip />;
};

export default CustomTooltip;
