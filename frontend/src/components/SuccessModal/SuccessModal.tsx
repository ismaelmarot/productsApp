import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
}

function SuccessModal({ show, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      const modal = Modal.getOrCreateInstance(modalRef.current);
      show ? modal.show() : modal.hide();
    }
  }, [show]);

  return (
    <div
      className='modal fade'
      tabIndex={-1}
      ref={modalRef}
      aria-labelledby='successModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='successModalLabel'>Producto Agregado</h5>
            <button type='button' className='btn-close' onClick={onClose}></button>
          </div>
          <div className='modal-body'>
            El producto fue agregado correctamente.
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal;
