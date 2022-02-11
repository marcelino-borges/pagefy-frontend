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
  return (
    <Tooltip
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      disableHoverListener={disabled}
      leaveDelay={leaveDelay || 500}
      title={title}
      arrow
      disableInteractive={disableInteractive !== undefined}
      placement={placement || "bottom"}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
