import { FC } from 'react';

interface OverlayModalProps {
  onClose: () => void;
  isOpen: boolean,
  className?: string,
}

const OverlayModal: FC<OverlayModalProps> = ({ onClose, isOpen, className }) => (
  <div
    className={`z-20 fixed inset-0 duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} ${className}`}
    onClick={onClose}
  />
);

export default OverlayModal;