import { db } from '@/db/user-db';
import { ApiResponse, User, UserPayload } from '@/types/user';
import { validateUserPayload } from '@/utils/parse';

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const users = await db.findAll();
    return {
      success: true,
      data: users,
    };
  } catch {
    return {
      success: false,
      error: ['Failed to fetch users'],
    };
  }
};

export const createUser = async (data: Partial<UserPayload>): Promise<ApiResponse<User>> => {
  const { payload, errors } = validateUserPayload(data);
  if (payload === null) {
    return {
      success: false,
      error: errors,
    };
  }

  const user = await db.createUser(payload);

  return {
    success: true,
    data: user,
    message: 'User created successfully',
  };
};
