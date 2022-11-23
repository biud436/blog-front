import {
    Card,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Paper,
    Typography,
    makeStyles,
    SxProps,
    Theme,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { State } from '../common';
import { useEffect, useState } from 'react';

export type LoginTagProps = {
    handleChange: (
        prop: keyof State,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    values: State;
    handleLogin: (event: any) => void;
    handleClickShowPassword: () => void;
    handleMouseDownPassword: (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => void;
    setValue: (value: number) => void;
};

/**
 * 원시 타입이 가장 성능이 좋지만,
 * MUI SX Props는 재사용성이
 *
 * a. Render 1,000 primitives -> `<div className="…">` -> 100ms
 * b. Render 1,000 components -> `<Div>` -> 120ms
 * c. Render 1,000 styled components -> `<StyledDiv>` -> 160ms
 * d. Render 1,000 Box -> `<Box sx={…}>` -> 370ms
 *
 * https://stackoverflow.com/a/68383383/15266929
 */
export const loginStyles: Record<string, SxProps<Theme> | undefined> = {
    form: {
        background: 'white',
    },
    centerAlignment: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBetween: {
        marginBottom: 1,
        justifyContent: 'space-between',
    },
    transparent: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        border: 0,
    },
};

/**
 * 시각 아이콘 ON 고차 컴포넌트 (HOC)
 * @returns
 */
export function VisibilityIcon() {
    return (
        <Visibility
            sx={{
                color: 'primary.main',
            }}
        />
    );
}

/**
 * 시각 아이콘 OFF 고차 컴포넌트 (HOC)
 * @returns
 */
export function VisibilityOffIcon() {
    return (
        <VisibilityOff
            sx={{
                color: 'primary.main',
            }}
        />
    );
}

/**
 * !=================================================================
 * ! 로그인 탭
 * !=================================================================
 */
export function LoginTab({
    handleChange,
    values,
    handleLogin,
    handleClickShowPassword,
    handleMouseDownPassword,
    setValue,
    ...props
}: LoginTagProps) {
    // 로그인 상태 유지 여부
    const [loggedin, setLoggedin] = useState(true);

    // 로그인 상태 유지 체크 박스 활성화 여부
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!localStorage.getItem('isLoggedIn')) {
            setLoggedin(true);
            localStorage.setItem('isLoggedIn', true + '');
        } else {
            setLoggedin(isLoggedIn);
        }
    }, []);

    return (
        <>
            <Card variant="outlined" sx={loginStyles.transparent}>
                <CardContent>
                    <Box sx={{ padding: 3 }}>
                        <Stack spacing={3} sx={loginStyles.centerAlignment}>
                            <Typography variant="h5">로그인</Typography>
                        </Stack>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            padding={[2, 2, 2, 2]}
                        >
                            <Stack paddingBottom="3rem">
                                <FormControl variant="outlined">
                                    <TextField
                                        required
                                        id="username-required"
                                        placeholder="아이디 입력"
                                        margin="normal"
                                        label="아이디"
                                        value={values.username}
                                        onChange={handleChange('username')}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack sx={loginStyles.form}>
                                <FormControl
                                    variant="outlined"
                                    onKeyDown={event => {
                                        // keycode가 deprecated 되었으므로 key를 사용합니다.
                                        if (event.key === 'Enter') {
                                            handleLogin(event);
                                        }
                                    }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        비밀번호
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            values.showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter') {
                                                handleLogin(event);
                                            }
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {values.showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="비밀번호"
                                    />
                                </FormControl>
                            </Stack>
                        </Box>
                        <Stack
                            spacing={2}
                            direction="row"
                            paddingBottom="3rem"
                            sx={loginStyles.spaceBetween}
                        ></Stack>

                        <Stack>
                            <Button
                                variant="contained"
                                onClick={handleLogin}
                                size="large"
                            >
                                로그인
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
