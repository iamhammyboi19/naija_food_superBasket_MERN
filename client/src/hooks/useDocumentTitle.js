import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(
    function () {
      document.title = title;
    },
    [title]
  );
}
