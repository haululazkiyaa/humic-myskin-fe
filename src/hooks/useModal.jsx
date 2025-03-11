import PropTypes from "prop-types";
import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const Modal = ({ children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/80">
        {children}
      </div>
    );
  };
  Modal.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { Modal, onOpen, onClose };
};

export default useModal;
