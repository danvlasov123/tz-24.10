'use client';
import { FC, FormEvent, useState } from 'react';

import { Input, Button } from 'src/UI';
import { Spinner } from 'src/components';
import { TypeUser } from 'src/types';

type TypeEditUserForm = {
  defaultValue: TypeUser;
  onSubmit: (data: TypeUser) => void;
  error: null | string;
};

type FormValues = {
  name: HTMLInputElement;
  email: HTMLInputElement;
  birthday_date: HTMLInputElement;
  phone_number: HTMLInputElement;
  address: HTMLInputElement;
};

const EditUserForm: FC<TypeEditUserForm> = ({
  defaultValue,
  onSubmit,
  error,
}) => {
  const defaultValueDate =
    '20' +
    defaultValue.birthday_date.slice(0, 2) +
    '-' +
    defaultValue.birthday_date.slice(3, 5) +
    '-' +
    defaultValue.birthday_date.slice(6, 8);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const elements = event.currentTarget
      .elements as HTMLFormControlsCollection & FormValues;

    const result = {
      name: elements.name.value,
      email: elements.email.value,
      birthday_date: elements.birthday_date.value,
      phone_number: elements.phone_number.value,
      address: elements.address.value,
      id: defaultValue.id,
    } as unknown as TypeUser;

    setLoading(true);

    await onSubmit(result);

    setLoading(false);
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Name
          </label>
        </div>
        <div className='mt-2'>
          <Input
            id='name'
            defaultValue={defaultValue.name}
            name='name'
            type='text'
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Email
          </label>
        </div>
        <div className='mt-2'>
          <Input
            disabled
            defaultValue={defaultValue.email}
            id='email'
            name='email'
            type='email'
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor='birthday_date'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Birthday Date
          </label>
        </div>
        <div className='mt-2'>
          <Input
            defaultValue={defaultValueDate}
            id='birthday_date'
            name='birthday_date'
            type='date'
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor='phone_number'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Phone
          </label>
        </div>
        <div className='mt-2'>
          <Input
            id='phone_number'
            defaultValue={Number(defaultValue.phone_number)}
            name='phone_number'
            type='number'
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Adress
          </label>
        </div>
        <div className='mt-2'>
          <Input
            id='address'
            defaultValue={defaultValue.address}
            name='address'
            type='text'
            required
          />
        </div>
      </div>

      {error && (
        <div>
          <span className='text-sm text-red-500'>{error}</span>
        </div>
      )}

      <div>
        <Button type='submit' disabled={loading}>
          {loading ? <Spinner /> : 'Complete'}
        </Button>
      </div>
    </form>
  );
};

export { EditUserForm };
