import React, { memo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// from: https://blog.logrocket.com/learn-react-portals-by-example/

const mount = document.getElementById("portal-root");

const Portal: React.FC<any> = ({ children }) => {
  const portalRef = useRef<any>(null);
  if (!portalRef.current) {
    portalRef.current = document.createElement("div");
  }
  portalRef.current.classList = "dropdown-portal";

  useEffect(() => {
    mount?.appendChild(portalRef.current);
    return () => mount?.removeChild(portalRef.current);
  }, []);

  return createPortal(children, portalRef.current);
};

export default memo(Portal);
