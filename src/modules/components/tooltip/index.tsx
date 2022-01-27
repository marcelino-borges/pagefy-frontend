import { Tooltip } from "@mui/material";

interface ITooltipProps {
  title: string;
  children: any;
}

const CustomTooltip = ({ title, children }: ITooltipProps) => {
  return (
    <Tooltip leaveDelay={500} title={title} arrow>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
