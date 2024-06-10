import { useRef, useEffect } from "react";

export default function useOutsideClick(close, listentocapture = true) {
  const ref = useRef(null);

  useEffect(
    function () {
      function handleOutsideClick(e) {
        // E get one mad comboboxoption component wey I dey use wey dey disturb my life smh
        // console.log(ref?.current?.contains(e.target.closest(".styledModal")));
        // console.log(ref?.current);
        if (
          (ref.current && ref.current.contains(e.target)) ||
          e.target.closest(".comboboxopt") ||
          e.target.classList.contains("comboboxopt")
        ) {
          return;
        }
        close();
      }

      document.addEventListener("click", handleOutsideClick, listentocapture);

      return () =>
        document.removeEventListener(
          "click",
          handleOutsideClick,
          listentocapture
        );
    },
    [close, listentocapture]
  );

  return ref;
}
