import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

// O rest pega todas as propriedades que nao foram especificadas
const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
    return(
        <div className="input-block">
            <label htmlFor={name}> {label} </label>
            <input type="text" id={name} {...rest} />
        </div>
    )
}
    
export default Input;