import React from 'react';
import css from './Modal.module.css';

const Modal = ({children, visible, setVisible}) => {
    const rootClasses = [css.modal];

    if (visible) {
        rootClasses.push(css.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={css.wrapper} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
