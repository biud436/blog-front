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
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { State } from '../common';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

type LoginTagProps = {
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

    // 로그인 상태 유지 체크 박스 토글 함수
    const changeLoggedIn = () => {
        setLoggedin(!loggedin);
        localStorage.setItem('isLoggedIn', !loggedin + '');
    };

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    border: 0,
                }}
            >
                <CardContent>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Container maxWidth="md">
                            <Stack
                                spacing={3}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h3">로그인</Typography>
                            </Stack>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                padding={[2, 2, 2, 2]}
                            >
                                <Stack paddingBottom="3rem">
                                    <FormControl sx={{}} variant="outlined">
                                        <TextField
                                            required
                                            id="username-required"
                                            placeholder="아이디 입력"
                                            margin="normal"
                                            label="아이디"
                                            value={values.username}
                                            onChange={handleChange('username')}
                                            sx={{ background: 'white' }}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack>
                                    <FormControl
                                        sx={{}}
                                        variant="outlined"
                                        onKeyDown={event => {
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
                                            sx={{ background: 'white' }}
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
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="비밀번호"
                                        />
                                    </FormControl>
                                </Stack>
                            </Box>
                            <Container>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    paddingBottom="3rem"
                                    sx={{
                                        marginBottom: 1,
                                        justifyContent: 'space-between',
                                    }}
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
                            </Container>
                        </Container>
                    </Paper>
                </CardContent>
            </Card>
        </>
    );
}
