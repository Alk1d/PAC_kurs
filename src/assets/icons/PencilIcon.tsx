import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const PencilIcon: FC<IconProps> = props => {
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
        viewBox="0 0 28 28"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <g id ="icons" fill={color}>
            <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>

    );
}