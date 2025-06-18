export type Response<T = undefined> = {
  data?: T;
  message: string;
  success: boolean;
};
