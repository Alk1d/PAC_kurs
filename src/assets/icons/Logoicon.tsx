import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const LogoIcon: FC<IconProps> = props => {
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
        viewBox="0 0 16 16"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <g id ="icons" fill={color}>
                <path d="M3 1H1V3H3V1Z"/>
                <path d="M3 5H1V7H3V5Z"/>
                <path d="M1 9H3V11H1V9Z"/>
                <path d="M3 13H1V15H3V13Z"/>
                <path d="M15 1H5V3H15V1Z"/>
                <path d="M15 5H5V7H15V5Z"/>
                <path d="M5 9H15V11H5V9Z"/>
                <path d="M15 13H5V15H15V13Z"/>
            </g>
        </svg>

    );
}