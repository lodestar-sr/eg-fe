import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import {
  EmailOutlined,
  PersonOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { FormProvider, RHFTextField } from '../../../components';
import { useAuthContext } from '../../../providers';
import { AuthService } from '../../../services';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().label('Username').trim().required(),
    email: yup.string().label('Email').email().required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(8)
      .matches(
        /(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*^#?&])/,
        'Password must contain at least 1 letter, 1 number and 1 special character',
      ),
    confirmPassword: yup
      .string()
      .label('Confirm password')
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required(),
  })
  .required();

export const Register = () => {
  const { setToken } = useAuthContext();

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const errors = methods.formState.errors;

  const onSubmit = () => {
    const formData = methods.getValues();
    methods.clearErrors();
    setSubmitting(true);
    AuthService.register(formData)
      .then((token) => {
        setToken(token);
      })
      .catch((err) => {
        methods.setError('root', {
          message: err.message || 'Register failed',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <FormProvider
      className="flex flex-col gap-4"
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <h1 className="mb-8 text-center font-bold">Register</h1>

      <RHFTextField
        name="name"
        label="User name"
        InputProps={{ endAdornment: <PersonOutlined /> }}
      />
      <RHFTextField
        name="email"
        label="Email"
        InputProps={{ endAdornment: <EmailOutlined /> }}
      />
      <RHFTextField
        name="password"
        label="Password"
        type="password"
        InputProps={{ endAdornment: <VpnKeyOutlined /> }}
      />
      <RHFTextField
        name="confirmPassword"
        label="Password Confirm"
        type="password"
        InputProps={{ endAdornment: <VpnKeyOutlined /> }}
      />

      {errors?.root && (
        <Alert className="mt-2" severity="error">
          {errors.root.message}
        </Alert>
      )}

      <div className="mt-6 flex justify-between">
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={submitting}
          fullWidth
        >
          Register
        </LoadingButton>
      </div>

      <div className="typo-link text-center">
        <Link className="typo-link" to="/login">
          Already registered? Back to Login
        </Link>
      </div>
    </FormProvider>
  );
};
