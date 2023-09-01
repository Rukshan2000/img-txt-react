import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';
import '../style/OcrComponent.css';
import CustomDialog from './CustomDialog'; // Update the path


const OcrComponent = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleImageUpload = async (acceptedFiles) => {
        setLoading(true);
        setProgress(0); // Reset progress
        const image = acceptedFiles[0];
        const result = await Tesseract.recognize(image, 'eng', { logger: (m) => setProgress(Math.floor(m.progress * 100)) });
        setText(result.data.text);
        setLoading(false);
    };

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleCopyText = () => {
        navigator.clipboard.writeText(text).then(() => {
            setDialogMessage('Text copied to clipboard!');
            setDialogVisible(true);
        }).catch((error) => {
            setDialogMessage('Unable to copy text.');
            setDialogVisible(true);
            console.error('Unable to copy text:', error);
        });
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    return (
        <div className="ocr-container">
            <h1 className='topic'>Image to Text Converter </h1>
            <p className='description'>The "Image to Text OCR" tool is a user-friendly application that uses Tesseract.js, a cutting-edge optical character recognition technology, to convert images containing text into editable text content. It simplifies the process of digitizing printed materials, extracting information, and enhancing accessibility.</p>

            {/* Dropzone */}
            <Dropzone onDrop={handleImageUpload} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {loading ? <p>Processing...</p> : <p>Drag & drop an image here, or click to select an image.</p>}
                    </div>
                )}
            </Dropzone>
            {/* Progress Bar */}
            {loading && (
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>
            )}

            <div className="text-display">
                <h2>Extracted Text:</h2>
                                <div className='button-container'>
                {text && <button className='button-container' onClick={handleCopyText}>Copy Text</button>}
                </div>
                <pre>{text}</pre>
                {dialogVisible && (
                    <CustomDialog message={dialogMessage} onClose={closeDialog} />
                )}
            </div>
            <div className="footer">
                <p>Developed by Rukshan Tharindu</p>
                <p><a href="https://wa.me/94779054385?text=Hi%20Rukshan%20Tharindu%2C%0A" target="_blank" rel="noopener noreferrer">Contact me on WhatsApp</a></p>
            </div>

        </div>
    );
};

export default OcrComponent;
