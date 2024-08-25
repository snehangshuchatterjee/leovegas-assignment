import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/modal.scss'

const Modal = ({children, title}) => {
    const [showModal, setShowModal] = useState(true);
    const closeModal = () => {
        setShowModal(false)
    }
    const modalClicked = (event) => {
        event.stopPropagation();
    }
    return(
        showModal && <div className='modal' data-testid="common-modal">
            <div className='background' data-testid="modal-background" onClick={closeModal}>
                <div className='container' data-testid="modal-container" onClick={modalClicked}>
                    <div className='header'>
                        <div className='title'>{title}</div>
                        <div className='close-button' onClick={closeModal}>
                            <i className="bi bi-x"></i>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Modal;