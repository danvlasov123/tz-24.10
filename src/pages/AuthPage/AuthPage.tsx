import React from 'react';

import { LoginForm } from 'src/modules/Forms';

const LoginPage = () => {
  return (
    <section className='container'>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
