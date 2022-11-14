import { PRIMARY_COLOR } from "../../../styles/colors";

const PencilIcon = ({ color = PRIMARY_COLOR }: any) => (
  <svg
    width={43}
    height={43}
    viewBox={`0 0 43 42`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.946289"
      width={32}
      height={32}
      rx="10"
      fill={color}
      fillOpacity="0.16"
    />
    <path
      d="M16 24H38"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33 14V19"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.575 29H36C36.5304 29 37.0391 28.7893 37.4142 28.4142C37.7893 28.0391 38 27.5304 38 27V14H20C18.9391 14 17.9217 14.4214 17.1716 15.1716C16.4214 15.9217 16 16.9391 16 18V27C16 27.5304 16.2107 28.0391 16.5858 28.4142C16.9609 28.7893 17.4696 29 18 29H23.425C23.5629 28.9996 23.6993 29.0277 23.8258 29.0826C23.9523 29.1375 24.0661 29.2179 24.16 29.3189C24.2539 29.4198 24.3259 29.5391 24.3715 29.6692C24.4171 29.7994 24.4353 29.9375 24.425 30.075L24 36C24 36.7956 24.3161 37.5587 24.8787 38.1213C25.4413 38.6839 26.2044 39 27 39C27.7956 39 28.5587 38.6839 29.1213 38.1213C29.6839 37.5587 30 36.7956 30 36L29.575 30.075C29.5647 29.9375 29.5829 29.7994 29.6285 29.6692C29.6741 29.5391 29.7461 29.4198 29.84 29.3189C29.9339 29.2179 30.0477 29.1375 30.1742 29.0826C30.3007 29.0277 30.4371 28.9996 30.575 29V29Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PencilIcon;
