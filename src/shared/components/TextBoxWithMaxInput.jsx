import React, { useState } from 'react';

const TextBoxWithMaxInput = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className="textarea-container">
            <textarea
                value={text}
                onChange={handleChange}
                maxLength="300"
                placeholder="Enter text (max 300 characters)"
                rows="10"
                cols="50"
            />
            <div className="char-counter">{text.length}/300</div>
        </div>
    );
};

export default TextBoxWithMaxInput;
