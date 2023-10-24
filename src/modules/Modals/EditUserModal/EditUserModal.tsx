import { FC, useState } from 'react';

import { TypeUser } from 'src/types';

import { Modal } from 'src/components';

import { EditUserForm } from 'src/modules/Forms';

import { fetchPatchEditUser } from 'src/api/api';

type TypeEditUserModal = {
  onToggle: () => void;
  isOpen: boolean;
  data: TypeUser;
  onSuccess: () => void;
};

const EditUserModal: FC<TypeEditUserModal> = ({
  isOpen,
  onToggle,
  data,
  onSuccess,
}) => {
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (values: TypeUser) => {
    const response = await fetchPatchEditUser(values);

    if (response.ok) {
      onSuccess();
      return;
    }

    response.json().then((value) => {
      setError(JSON.stringify(value));
    });
  };

  return (
    <Modal isOpen={isOpen} onToggle={onToggle} title='Edit user'>
      <EditUserForm onSubmit={handleSubmit} defaultValue={data} error={error} />
    </Modal>
  );
};

export { EditUserModal };
