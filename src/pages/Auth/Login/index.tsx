import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormProvider, RHFTextField } from '../../../components';
import { useAuthContext } from '../../../providers';
import { AuthService } from '../../../services';

export interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().label('Email').email().required(),
    password: yup.string().label('Password').required(),
  })
  .required();

export const Login = () => {
  const { setToken } = useAuthContext();

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const errors = methods.formState.errors;

  const onSubmit = () => {
    const formData = methods.getValues();
    methods.clearErrors();
    setSubmitting(true);
    AuthService.login(formData)
      .then((token) => {
        setToken(token);
      })
      .catch((err) => {
        methods.setError('root', {
          message: err.message || 'Login failed',
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
      <h1 className="mb-8 text-center font-bold">Login</h1>

      <RHFTextField name="email" label="Email" />
      <RHFTextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          ),
        }}
      />

      {errors?.root && (
        <Alert className="mt-2" severity="error">
          {errors.root.message}
        </Alert>
      )}

      <div className="mt-6">
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={submitting}
          fullWidth
        >
          Login
        </LoadingButton>
      </div>

      <div className="typo-link text-center">
        <Link className="typo-link" to="/register">
          Not registered yet? Goto to Register
        </Link>
      </div>
    </FormProvider>
  );
};
