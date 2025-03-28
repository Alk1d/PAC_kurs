import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const UploadIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#ffffff',
        height = 32,
        width = 32,
        onClick
    } = props;

    return (
        <svg width={width} height={height}
        className={className}
        onClick={onClick}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink='http://www.w3.org/1999/xlink'
        xmlSpace='preserve'
        >
<g fill={color} >

<path d="m0 0h32v32h-32z"/>

<path d="m22.0092457 0 7.9907543 10.0183757v21.9816243h-28v-32zm-.9632457 2h-17.046v28h24v-19.282zm-5.0208737 8 5.6568542 5.6568542-1.4142135 1.4142136-3.2667865-3.2659805-.0009805 10.084h-2l.0009805-10.085-3.2687475 3.2669805-1.4142135-1.4142136 5.6568542-5.6568542.0251068.0250873z" fill="#000000" fillRule="nonzero"/>

</g>

</svg>
    );
}