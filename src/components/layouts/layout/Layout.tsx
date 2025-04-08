import { FC, useState } from "react";
import { LayoutProps } from "./LayoutProps";
import './layoutStyles.scss'
import { LogoIcon } from "../../../assets/icons/Logoicon";
import { UserMenu } from "../../userMenu";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxToolkitHooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../store/slices/userSlice";
import { MenuItem } from "../../userMenu/userMenuProps";
import { RoutesPaths } from "../../../constants/commonConstants";
import { PencilIcon } from "../../../assets/icons"; 
import { Dialog } from "../../dialog";
import { TextField } from "../../textField";

export const Layout: FC<LayoutProps> = props => {
    const { footer, headerChild, title, children } = props;
    const { role } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showModelDialog, setShowModelDialog] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");

    const logOutHandler = () => {
        dispatch(logOut());
        navigate(RoutesPaths.Login);
    }

    const exitMenuItem: MenuItem = {
        id: 'exit',
        action: logOutHandler,
        label: 'Выйти'
    };

    const showModelDialogHandler = () => {
        setShowModelDialog(true);
    }

    const generateTextHandler = async () => {
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, max_tokens: 500 })
        });
        const data = await response.json();
        setGeneratedText(data.generated_text);
    }

    const closeDialog = () => {
        setShowModelDialog(false);
        setPrompt("");
        setGeneratedText("");
    }

    return (
        <div className="layout">
            <Dialog title={"Model generate"}
                                open={showModelDialog}
                                onSave={generateTextHandler}
                                onCancel={closeDialog}
                            >
                                <TextField labelText='Промпт' value={prompt} onChange={(val) => setPrompt(val)} />
                                <textarea value={generatedText}/>
                            </Dialog>
            <div className="layout_header">
                <div>
                    <LogoIcon />
                </div>
                <div>
                    <div>{title ?? "Учет личной библиотеки"}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout_menu">
                    <div className="layout_menu-model">
                        <PencilIcon onClick={showModelDialogHandler}/>
                    </div>
                    <div className="layout_menu-user">
                    <UserMenu items={role === 'user' ? [exitMenuItem] : [exitMenuItem]} />
                    </div>
                </div>
            </div>
            <div className="layout_body">
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}