import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const DownloadIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#ffffff',
        height = 28,
        width = 28,
        onClick
    } = props;

    return (
        <svg width={width} height={height}
        className={className}
        onClick={onClick}
        viewBox="0 0 24 24"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <g id ="icons" fill={color}>
            <path d="m8 12 4 4 4-4" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V4M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
            </g>
        </svg>

    );
}

