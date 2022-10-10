import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import { LoginResponse, useAuth } from 'app/providers/authProvider';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { State } from './common';
import { useMethods, useRendersCount } from 'react-use';
import { User } from 'store/types';
import { LoginTab } from './components/LoginTab';
import { Container, Grid, Stack } from '@mui/material';

const initialState = {
    username: '',
    password: '',
    showPassword: false,
};

type LoginTabState = typeof initialState;

type TabControlProps = {
    getTabLinkClassName: (id: number) => string;
    changeTab: (tabId: number) => () => void;
};

type LoginTabProps = {
    getTabContentClassName: (id: number) => string;
    handleChange: (
        prop: keyof State,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeLoggedIn: () => void;
    handleLogin: (event: any) => Promise<LoginResponse | undefined>;
    values: LoginTabState;
    loggedin: boolean;
};

function createMethods(state: LoginTabState) {
    return {
        reset() {
            return initialState;
        },
        handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
            return {
                ...state,
                username: event.target.value,
            };
        },
        handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
            return {
                ...state,
                password: event.target.value,
            };
        },
        toggleShowPassword() {
            return {
                ...state,
                showPassword: !state.showPassword,
            };
        },
    };
}

/**
 * 로그인 페이지 메인
 */
export function LoginPage() {
    /**
     * STATES
     */
    const [state, methods] = useMethods(createMethods, initialState);
    const [values, setValues] = React.useState<State>({
        username: '',
        password: '',
        showPassword: false,
    });
    const [user, setUser] = useRecoilState(userState);
    const [tabId, setValue] = React.useState(1);
    const [loggedin, setLoggedin] = React.useState(true);

    /**
     * USE CONTEXTS
     */
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const rendersCount = useRendersCount();

    /**
     * 유저 데이터 변경 처리
     *
     * @param prop
     * @returns
     */
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const toggleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    /**
     * 로그인 처리
     *
     * @param username
     * @param password
     * @returns
     */
    const login = async (username: string, password: string) => {
        const pathname = location.pathname;

        return await auth.login(username, password, () => {
            navigate('/blog/edit');
        });
    };

    /**
     * 탭 변경 처리
     *
     * @param tabId
     * @returns
     */
    const changeTab = (tabId: number) => () => {
        setValue(tabId);
    };

    /**
     * 비밀번호 표시/감추기 제어
     */
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    /**
     * 알림창 표시
     */
    const toastWrapper = (
        message: '아이디를 입력해주세요' | '비밀번호를 입력해주세요' | string,
    ) => {
        toast(message, {
            position: 'top-right',
            containerId: '#login-page',
        });
    };

    /**
     * 로그인
     */
    const handleLogin = async (event: any) => {
        event.preventDefault();

        const idValue = values.username;
        const pwValue = values.password;

        if (idValue === '') {
            toastWrapper('아이디를 입력해주세요');
            return;
        }

        if (pwValue === '') {
            toastWrapper('비밀번호를 입력해주세요');
            return;
        }

        return login(idValue, pwValue);
    };

    /**
     * 로그인 상태 유지 체크 박스 토글 함수
     */
    const changeLoggedIn = () => {
        setLoggedin(!loggedin);
        localStorage.setItem('isLoggedIn', !loggedin + '');
    };

    const getTabLinkClassName = (id: number) => {
        const name = ['tab-link'];

        if (tabId === id) {
            name.push('current');
        }

        return name.join(' ');
    };

    /**
     * 탭 클래스명 변경 처리
     * @param id
     * @returns
     */
    const getTabContentClassName = (id: number) => {
        const name = ['tab-content'];

        if (tabId === id) {
            name.push('current');
        }

        return name.join(' ');
    };

    /**
     * 훅 마운트 처리
     */
    useEffect(() => {
        const currentUser = user as User;
        if (currentUser && currentUser.username !== '') {
            toastWrapper('이미 로그인되어있습니다');
        }
    }, []);

    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <LoginTab
                        handleChange={handleChange}
                        handleLogin={handleLogin}
                        handleMouseDownPassword={handleMouseDownPassword}
                        setValue={setValue}
                        values={values}
                        handleClickShowPassword={toggleShowPassword}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
