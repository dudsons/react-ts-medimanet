import React from 'react';


interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange(value: boolean): void;
}

export const Checkbox2: React.FunctionComponent<IProps> = ({ children,
                                                              onChange, ...shared }) => {
    return <input onChange={e => onChange(e.target.checked)} {...shared} />
}

Checkbox2.defaultProps = {
    type: 'checkbox',
}

