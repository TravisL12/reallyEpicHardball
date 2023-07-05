import { useState } from "react";

export const usePortal = (offset?: { top?: number; left?: number }) => {
  const [coords, setCoords] = useState({});

  const setPortalCoordinates = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      left: rect.x + (offset?.left || 0),
      top: rect.y + window.scrollY + (offset?.top || 0),
    });
  };

  return [coords, setPortalCoordinates];
};
