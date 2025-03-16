import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const PlusIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#313131',
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
            <path d="M9,17h6v6a1,1,0,0,0,2,0V17h6a1,1,0,0,0,0-2H17V9a1,1,0,0,0-2,0v6H9a1,1,0,0,0,0,2Z"/>
            </g>
        </svg>

    );
}