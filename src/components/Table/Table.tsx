import { FC, memo, useMemo } from 'react';

import type { TypeTableColumn } from 'src/types';

import { createNumberArray } from 'src/utils';

type TypeTableBody<T extends TypeTableColumn> = {
  [K in T['key']]: any;
  // свойства массива объектов data
};

type TypeTableProps<T extends TypeTableColumn> = {
  columns: T[];
  data: TypeTableBody<T>[];
  navigation?: boolean;
  page?: number;
  onEdit?: (data: TypeTableBody<T>) => void;
  countPages?: number;
  limit?: number;
  onChangePagination?: (page: number) => void;
};

const Table: FC<TypeTableProps<TypeTableColumn>> = memo((props) => {
  const {
    columns,
    data,
    navigation = false,
    page = 1,
    limit = 5,
    countPages = 5,
    onChangePagination = () => {},
    onEdit = () => {},
  } = props;

  const pagesArray = createNumberArray(1, Math.ceil(countPages / limit));

  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-left text-sm text-gray-900 '>
        {useMemo(
          () => (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 '>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope='col' className='px-6 py-3'>
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
          ),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          []
        )}
        {useMemo(
          () => (
            <tbody>
              {data.map((row, key) => {
                return (
                  <tr className='border-b bg-white' key={key}>
                    {columns.map((column, key2) => {
                      if (column.key === 'actions') {
                        return null;
                      }

                      return (
                        <th
                          key={key2}
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
                        >
                          {row[column.key]}
                        </th>
                      );
                    })}
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => onEdit(row)}
                        className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [data]
        )}
      </table>
      {navigation && (
        <nav aria-label='Table navigation' className='py-4'>
          <ul className='inline-flex -space-x-px text-sm'>
            <li>
              <button
                onClick={() => page !== 1 && onChangePagination(page - 1)}
                className='ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700'
              >
                Previous
              </button>
            </li>
            {pagesArray.map((p) => {
              return (
                <li key={p}>
                  <button
                    onClick={() => p !== page && onChangePagination(p)}
                    className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight ${
                      page === p ? 'text-blue-600' : 'text-gray-900'
                    } hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {p}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={() =>
                  page !== pagesArray[pagesArray.length - 1] &&
                  onChangePagination(page + 1)
                }
                className='flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 '
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
});

Table.displayName = 'Table';

export { Table };
