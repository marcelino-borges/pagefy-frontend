const FontColorIcon = ({
  size = 25,
  bucketColor = "white",
  selectedColor = "white",
}: any) => (
  <svg
    width={size}
    height={size}
    //viewBox="0 0 25 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 17.8333H25V21.9999H0V17.8333Z" fill={selectedColor} />
    <path
      d="M11.4584 0.125L5.72925 14.7083H8.073L9.23966 11.5833H15.7501L16.9167 14.7083H19.2605L13.5417 0.125H11.4584ZM10.0209 9.5L12.5001 2.90625L14.9792 9.5H10.0209Z"
      fill={bucketColor}
    />
  </svg>
);
export default FontColorIcon;
