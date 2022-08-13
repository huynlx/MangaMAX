import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import OverlayModal from '@/components/Shared/OverlayModal';

interface modalProps {
  isOpen: boolean,
  onClose: () => void,
  className: string
}

const Modal: FC<PropsWithChildren<modalProps>> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal">
      <OverlayModal isOpen={isOpen} onClose={onClose} className={className} />
      {children}
    </div>, document.body);
}

export default Modal;