import { ChangeEvent, FC } from 'react';
import { DialogProps } from './DialogProps';
import './dialogStyles.scss'
import clsx from "classnames"
import { Button } from '../button'

export const Dialog: FC<DialogProps> = props => {
    const { 
            className,
            title,
            children,
            onSave,
            onCancel,
            open = false
        } = props;

        if(!open) {
            return null;
        }

    return (
        <div className="dialog" onClick={onCancel}>
            <div className={clsx('dialog_paper', className)} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <h4 className="dialog_header"> {title}</h4>
                <div className="dialog_body">
                    {children}
                </div>
                <div className="dialog_footer">
                    <Button type="primary" text="Сохранить" onClick={onSave} />
                    <Button text="Отмена" onClick={onCancel} />
                </div>
            </div>
        </div>
    );
}