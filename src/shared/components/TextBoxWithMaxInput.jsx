import React from 'react';
import '../css/TextBoxWithMaxInput.css';

const TextBoxWithMaxInput = React.forwardRef(({ value, onChange, ...rest }, ref) => {
    return (
        <div className="textarea-container">
            <textarea
                ref={ref}
                value={value}
                onChange={onChange}
                maxLength="300"
                placeholder="Enter text (max 300 characters)"
                rows="10"
                cols="50"
                {...rest}
            />
            <div className="char-counter">{value ? value.length : 0}/300</div>
        </div>
    );
});

export default TextBoxWithMaxInput;
