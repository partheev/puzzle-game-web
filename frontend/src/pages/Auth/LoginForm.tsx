import {
    Alert,
    Button,
    Card,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthAPI } from '../../services/api/Auth';
import { useAppDispatch } from '../../hooks/redux';
import { loggedIn } from '../../store/slices/userSlice';
import { AxiosError } from 'axios';

interface SignInProps {
    goToRegistration: () => void;
}
export const LoginForm: FC<SignInProps> = ({ goToRegistration }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [btnLoading, setbtnLoading] = useState(false);
    const [alertMsg, setalertMsg] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Email required'),
            password: Yup.string().required('Password required'),
        }),
        onSubmit: async (values) => {
            setbtnLoading(true);
            try {
                const res = await AuthAPI.login({
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('access_key', res.access_key);
                formik.resetForm();
                setbtnLoading(false);
                dispatch(loggedIn(res));
                navigate('/game');
            } catch (err) {
                setbtnLoading(false);
                console.log(err);
                if (err instanceof AxiosError) {
                    setalertMsg(err?.response?.data.message);
                }
                setTimeout(() => {
                    setalertMsg(null);
                }, 5000);
            }
        },
    });

    return (
        <div>
            <Card
                sx={{
                    mx: 'auto',
                    padding: '2rem',
                    display: 'flex',
                    maxWidth: '20rem',
                    flexDirection: 'column',
                    rowGap: '1rem',
                }}
            >
                <Typography variant='h5' sx={{ alignSelf: 'center' }}>
                    Sign In
                </Typography>

                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email'
                    type='text'
                    value={formik.values.email}
                    label='Email'
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password'
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    autoComplete='current-password'
                />

                <Button
                    onClick={() => formik.handleSubmit()}
                    variant='contained'
                >
                    {btnLoading ? (
                        <CircularProgress
                            sx={{
                                color: 'white',
                            }}
                        />
                    ) : (
                        'Sign In'
                    )}
                </Button>
                {alertMsg && <Alert severity='error'>{alertMsg}</Alert>}

                <Typography
                    variant='subtitle1'
                    sx={{ alignSelf: 'center', cursor: 'pointer' }}
                    onClick={goToRegistration}
                >
                    New user? Register here
                </Typography>
            </Card>
        </div>
    );
};
