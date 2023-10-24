'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Input } from 'src/UI';

import { fetchLogin } from 'src/api/api';
import { Spinner } from 'src/components';

import { useAppDispatch } from 'src/hooks/storeHooks';

import { authActions } from 'src/redux/slices/auth/AuthSlice';

type FormValues = {
  username: HTMLInputElement;
  password: HTMLInputElement;
};

const STATUS = {
  init: 'init',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(STATUS.init);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const elements = event.currentTarget
      .elements as HTMLFormControlsCollection & FormValues;

    const username = elements.username.value;

    const password = elements.password.value;

    const data = { username, password };

    setStatus(STATUS.loading);

    await fetchLogin(data)
      .then((response) => {
        if (response.ok) {
          setStatus(STATUS.success);
          return dispatch(authActions.setSuccessAuth({ username }));
        }

        return Promise.reject(response);
      })
      .catch((response) => {
        response.json().then((error: any) => {
          console.error(error?.error);
          setErrorMessage(error?.error);
          setStatus(STATUS.error);
        });
      });
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Username
        </label>
        <div className='mt-2'>
          <Input
            id='username'
            name='username'
            autoComplete='username'
            type='text'
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Password
          </label>
        </div>
        <div className='mt-2'>
          <Input
            id='password'
            name='password'
            autoComplete='current-password'
            type='password'
            required
          />
        </div>
      </div>

      <div>
        <Button type='submit'>
          {status === STATUS.loading ? <Spinner /> : 'Sign in'}
        </Button>
      </div>
      {status === STATUS.error && (
        <div>
          <span className='text-sm text-red-500'>{errorMessage}</span>
        </div>
      )}
    </form>
  );
};

export { LoginForm };
