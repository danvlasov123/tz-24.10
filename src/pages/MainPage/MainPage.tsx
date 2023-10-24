'use client';
import { FC, Fragment } from 'react';

import { Table } from 'src/modules';
import { UsersTable } from 'src/modules/UsersTable/UsersTable';

import type { TypeUsersTable, TypeTableColumn } from 'src/types';

const MainPage: FC<{ data: TypeUsersTable }> = ({ data }) => {
  return (
    <section className='container'>
      <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight'>
        Users
      </h2>
      <div className='py-6'>
        <UsersTable users={data} />
      </div>
    </section>
  );
};

export default MainPage;
