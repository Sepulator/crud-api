import { db } from '@/db/user-db';
import { ApiResponse, User, UserPayload } from '@/types/user';
import { parseId, validateUserPayload } from '@/utils/parse';

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

export const getUserById = async (url: string): Promise<ApiResponse<User>> => {
  const id = parseId(url);

  if (id === null) {
    return {
      success: false,
      error: ['Invalid ID. Provide correct uuid'],
    };
  }

  const user = await db.getUserById(id);

  if (!user) {
    return {
      success: true,
      error: ['User not found.'],
    };
  }

  return {
    success: true,
    data: user,
  };
};
