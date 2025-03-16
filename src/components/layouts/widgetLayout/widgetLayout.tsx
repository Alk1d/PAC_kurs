import { FC } from "react";
import { widgetLayoutProps } from "./widgetLayoutProps";
import './widgetLayoutStyles.scss'

export const WidgetLayout: FC<widgetLayoutProps> = props => {
    const {
        children
    } = props;

    return (
        <div className="widget-layout">
            {children}
        </div>
    );
}