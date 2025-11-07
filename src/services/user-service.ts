import { dbService } from '@/services/db-service';
import { ApiResponse, User, UserPayload } from '@/types/user';
import { parseId, validateUserPayload, validateUserUpdatePayload } from '@/utils/parse';

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const users = await dbService.findAll();
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

  const user = await dbService.createUser(payload);

  return {
    success: true,
    data: user,
    message: 'User created successfully',
  };
};

export const getUserById = async (
  url: string,
  callback: (id: string) => Promise<User | null>
): Promise<ApiResponse<User>> => {
  const id = parseId(url);

  if (id === null) {
    return {
      success: false,
      error: ['Invalid ID. Provide correct uuid'],
    };
  }

  const user = await callback(id);

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

export const getUser = (url: string) => {
  return getUserById(url, dbService.getUser);
};

export const deleteUser = (url: string) => {
  return getUserById(url, dbService.deleteUser);
};

export const updatedUser = async (url: string, data: Partial<UserPayload>): Promise<ApiResponse<User>> => {
  const result = await getUser(url);

  if (!result.success || (Array.isArray(result.error) && result.error.length > 0)) {
    return result;
  }

  const { payload, errors } = validateUserUpdatePayload(data);

  if (payload === null) {
    return Promise.resolve({
      success: false,
      error: errors,
    });
  }

  const user = await dbService.updateUser(result.data!.id, payload);

  if (!user) {
    return {
      success: false,
      error: ['User update failed.'],
    };
  }

  return {
    success: true,
    data: user,
  };
};
