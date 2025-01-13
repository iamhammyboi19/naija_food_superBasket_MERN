import { useState } from "react";

export function useShowHideMenus() {
  const [showHideToggle, setShowHideToggle] = useState(false);
  const [curSpot, setCurSpot] = useState(0);

  function showHideToggleFunc(number) {
    setShowHideToggle(true);
    setCurSpot((num) => (num === number ? 0 : number));
  }

  return { showHideToggle, curSpot, showHideToggleFunc };
}
