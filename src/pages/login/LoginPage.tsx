import { FC, useEffect, useState } from 'react';
import { TextField, Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import './loginPageStyles.scss';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { signIn } from '../../services';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';

export const LoginPage: FC = () => {
    const { accessToken, role } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    
    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || role === 'guest') {
                navigate(`/${RoutesPaths.Books}`);
            } else {
                navigate(RoutesPaths.Login);
            }
        }
    }, [accessToken, role, navigate]);

    const loginChangedHandler = (value: string) => {
        setLogin(value);
    }
    const passwordChangedHandler = (value: string) => {
        setPassword(value);
    }

    const loginHandler = () => {
        dispatch(signIn({login, password}));
    }

    return (
        <WidgetLayout>
            <div className="login-page_form">
                <h3 className="login-page_title">Вход</h3>
                <div className="login-page_fields">
                    <TextField labelText="Логин" value={login} onChange={loginChangedHandler}/>
                    <TextField labelText="Пароль" value={password} type="password" onChange={passwordChangedHandler}/>
                </div>
                <div className="login-page_actions">
                <Button text="Войти" onClick={loginHandler} type='primary' />
                </div>
            </div>
        </WidgetLayout>
    );
};
