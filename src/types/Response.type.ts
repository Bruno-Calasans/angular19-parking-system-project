export type Response<T> = {
  status: 'success';
  code: number;
  result: T[];
};

export type ResponseError = {
  status: 'failure';
  code: number;
  msg: string;
};
