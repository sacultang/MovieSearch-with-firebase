import React, { ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
interface IProps {
  children: ReactNode;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;
const Portal = ({ children }: IProps) => {
  const el = useRef(document.createElement('div'));
  useEffect(() => {
    const current = el.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);
  return createPortal(children, el.current);
};

export default Portal;
