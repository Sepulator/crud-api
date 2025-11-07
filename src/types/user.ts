export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserAccessors = {
  [K in keyof User]: K;
};

export const UserKeys: UserAccessors = {
  id: 'id',
  username: 'username',
  age: 'age',
  hobbies: 'hobbies',
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string[];
};

export type UserPayload = Omit<User, 'id'>;
export type OptionalUser = Partial<UserPayload>;
