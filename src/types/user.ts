export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string[];
};

export type UserPayload = Omit<User, 'id'>;
