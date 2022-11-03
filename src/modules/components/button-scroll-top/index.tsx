import React, { useEffect, useState } from "react";
import { Root } from "./style";
import { ArrowUpward } from "@mui/icons-material";

const ButtonScrollUp = () => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const scrollUp = () => {
    setHasScrolledDown(window.scrollY > window.innerHeight / 2);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollUp);

    return () => {
      document.removeEventListener("scroll", scrollUp);
    };
  }, []);

  return (
    <Root
      show={hasScrolledDown}
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}
    >
      <ArrowUpward />
    </Root>
  );
};

export default React.memo(ButtonScrollUp);
