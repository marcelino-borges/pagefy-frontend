import React, { useEffect, useState } from "react";
import { Root } from "./style";
import { ArrowUpward } from "@mui/icons-material";

const ButtonScrollTop = () => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setHasScrolledDown(window.scrollY > window.innerHeight / 2);
    });
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

export default React.memo(ButtonScrollTop);
