import { Tooltip } from "@mui/material";

interface ITooltipProps {
  title: string;
  children: any;
  leaveDelay?: number;
}

const CustomTooltip = ({ title, leaveDelay, children }: ITooltipProps) => {
  return (
    <Tooltip leaveDelay={leaveDelay || 500} title={title} arrow>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
