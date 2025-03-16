import { FC } from "react";
import { LayoutProps } from "./LayoutProps";
import './layoutStyles.scss'
import { LogoIcon } from "../../../assets/icons/Logoicon";
import { UserMenu } from "../../userMenu";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxToolkitHooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../store/slices/userSlice";
import { MenuItem } from "../../userMenu/userMenuProps";

export const Layout: FC<LayoutProps> = props => {
    const { footer, headerChild, title, children } = props;
    const { role } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logOutHandler = () => {
        dispatch(logOut());
    }

    const exitMenuItem: MenuItem = {
        id: 'exit',
        action: logOutHandler,
        label: 'Выйти'
    };

    return (
        <div className="layout">
            <div className="layout_header">
                <div>
                    <LogoIcon />
                </div>
                <div>
                    <div>{title ?? "Учет личной библиотеки"}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout_user-menu">
                    <UserMenu items={role === 'user' ? [exitMenuItem] : [exitMenuItem]} />
                </div>
            </div>
            <div className="layout_body">
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}