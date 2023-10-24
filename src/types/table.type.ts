export type TypeTable = {
  head: TypeTableColumn;
  body: [];
};

export type TypeTableColumn = {
  name: string;
  key: string;
};
