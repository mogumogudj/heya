import React from 'react';
import '../css/TextBoxWithMaxInput.css';

const TextBoxWithMaxInput = ({ value, onChange }) => {
    return (
        <div className="textarea-container">
            <textarea
                value={value}
                onChange={onChange}
                maxLength="300"
                placeholder="Enter text (max 300 characters)"
                rows="10"
                cols="50"
            />
            <div className="char-counter">{value.length}/300</div>
        </div>
    );
};

export default TextBoxWithMaxInput;
