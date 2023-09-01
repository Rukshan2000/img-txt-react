import React from 'react';
import '../style/CustomDialog.css';

const CustomDialog = ({ message, onClose }) => {
    return (
        <div className="custom-dialog-overlay">
            <div className="custom-dialog">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default CustomDialog;
