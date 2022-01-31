import { Tooltip } from "@mui/material";

interface ITooltipProps {
  title: string;
  children: any;
  leaveDelay?: number;
  disableInteractive?: boolean;
  placement?: any;
}

const CustomTooltip = ({
  title,
  leaveDelay,
  disableInteractive,
  placement,
  children,
}: ITooltipProps) => {
  return (
    <Tooltip
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
