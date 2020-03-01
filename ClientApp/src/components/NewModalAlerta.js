import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


const NewModalMapa = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div style={{position: 'absolute',
    top: 0,
    height: '100vh',
    width: '100%',
    backgroundColor:'lightgray'}}>{children}</div>, elRef.current);
};

export default NewModalMapa;