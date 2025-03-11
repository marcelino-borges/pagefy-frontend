import { useCallback, useEffect, useState } from "react";
import { getRandomIntInRange } from "../../utils";

export const useRandomElementOnRender = <T>(array: readonly T[]) => {
  const getRandomIndex = useCallback(
    () => getRandomIntInRange(0, array.length - 1),
    [array]
  );

  const [bannerIndex, setBannerIndex] = useState<number>(getRandomIndex());

  useEffect(() => {
    setBannerIndex(getRandomIndex());
  }, [setBannerIndex, getRandomIndex]);

  return {
    element: array[bannerIndex],
  };
};
