import { FC } from 'react';
import { TextFieldProps } from './textFieldProps';
import "./textFieldStyles.scss";
import clsx from 'classnames';

export const TextField: FC<TextFieldProps> = props => {
    const {
        info,
        infoType = 'info',
        labelText,
        lblWeight,
        onChange,
        type = 'text',
        value
    } = props;
    const changeValueHandler = (event : React.ChangeEvent<HTMLInputElement> ) => { 
        onChange && onChange(event.target. value); 
    };

return (
    <div className="container">
        <label className={clsx('container_lbl', {
            'container_lbl_strong': lblWeight==='strong'
        })}>{labelText}</label>
        <input className="container_input" type={type} value={value} onChange={changeValueHandler} />
        <span className={clsx('container_info', {
            'container_info_info': infoType === 'info',
            'container_info_error': infoType === 'error',
            'container_info_success': infoType === 'success',
        })}>{info}</span>
    </div>
);
}