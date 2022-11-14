import { PRIMARY_COLOR } from "../../../styles/colors";

const ShareIcon = ({ color = PRIMARY_COLOR }: any) => (
  <svg
    width={41}
    height={42}
    viewBox={`0 0 41 42`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.891602"
      width={32}
      height={32}
      rx="10"
      fill={color}
      fillOpacity="0.16"
    />
    <path
      d="M19 30C21.2091 30 23 28.2091 23 26C23 23.7909 21.2091 22 19 22C16.7909 22 15 23.7909 15 26C15 28.2091 16.7909 30 19 30Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33 39C35.2091 39 37 37.2091 37 35C37 32.7909 35.2091 31 33 31C30.7909 31 29 32.7909 29 35C29 37.2091 30.7909 39 33 39Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33 21C35.2091 21 37 19.2091 37 17C37 14.7909 35.2091 13 33 13C30.7909 13 29 14.7909 29 17C29 19.2091 30.7909 21 33 21Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.6373 19.1626L22.3623 23.8376"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.3623 28.1626L29.6373 32.8376"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShareIcon;
