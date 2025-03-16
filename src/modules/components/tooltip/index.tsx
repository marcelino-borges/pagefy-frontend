import { Tooltip } from "@mui/material";

interface ITooltipProps {
  title: string;
  children: any;
  leaveDelay?: number;
  disableInteractive?: boolean;
  placement?: any;
  disabled?: boolean;
  key?: string;
  // All other props
  [x: string]: any;
}

const CustomTooltip = ({
  title,
  leaveDelay,
  disableInteractive,
  placement,
  children,
  disabled = false,
  key,
  ...rest
}: ITooltipProps) => {
  return (
    <Tooltip
      {...rest}
      key={key}
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      disableHoverListener={disabled}
      leaveDelay={leaveDelay || 100}
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
