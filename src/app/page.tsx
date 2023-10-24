import MainPage from 'src/pages/MainPage/MainPage';

import { fetchGetUsers } from 'src/api/api';

import type { TypeUsersTable } from 'src/types';

const Main = async () => {
  const response = await fetchGetUsers(10, 0);

  const data = (await response.json()) as TypeUsersTable;

  return <MainPage data={data} />;
};

export default Main;
