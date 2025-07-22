import { useState, useRef, useEffect } from 'react';
import { Modal } from 'bootstrap';

export const useSuccessModal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      const modal = Modal.getOrCreateInstance(modalRef.current);
      showModal ? modal.show() : modal.hide();
    }
  }, [showModal]);

  return { modalRef, showModal, setShowModal };
};
