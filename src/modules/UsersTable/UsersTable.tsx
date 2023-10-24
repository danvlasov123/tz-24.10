'use client';
import { FC, Fragment, useCallback, useMemo, useState } from 'react';

import { Table } from 'src/components';

import { columns } from './columns';

import { fetchGetUsers } from 'src/api/api';

import type { TypeUsersTable, TypeUser } from 'src/types';
import { EditUserModal } from '../Modals';

type TypeUsersTableProps = {
  users: TypeUsersTable;
};

type TypeModalEditUser = {
  open: boolean;
  selectedUser: null | TypeUser;
};

const defaultValueModal = {
  open: false,
  selectedUser: null,
};

const UsersTable: FC<TypeUsersTableProps> = ({ users }) => {
  const limit = 10;

  console.log(users);

  const [modal, setModal] = useState<TypeModalEditUser>(defaultValueModal);

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<TypeUsersTable['results']>(users.results);

  const page = useMemo(() => offset / limit + 1, [offset]);

  const handleChangePagination = useCallback(async (page: number) => {
    const currentOffset = page * limit - 10;

    setOffset(currentOffset);

    const response = await fetchGetUsers(limit, currentOffset);

    if (!response.ok) {
      return alert('Error get users');
    }

    const data = (await response.json()) as TypeUsersTable;

    setData(data.results);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleModal = () =>
    setModal((prev) => ({ ...prev, open: false }));

  const onSuccessEdit = () => setModal(defaultValueModal);

  const handleEditUser = useCallback((user: any) => {
    const data = user as TypeUser;

    setModal({
      open: true,
      selectedUser: data,
    });
  }, []);

  return (
    <Fragment>
      <Table
        columns={columns}
        data={data}
        onEdit={handleEditUser}
        navigation
        countPages={users.count}
        page={page}
        limit={10}
        onChangePagination={handleChangePagination}
      />
      {modal.selectedUser && (
        <EditUserModal
          data={modal.selectedUser}
          isOpen={modal.open}
          onSuccess={onSuccessEdit}
          onToggle={handleToggleModal}
        />
      )}
    </Fragment>
  );
};

export { UsersTable };
