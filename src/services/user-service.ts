import { db } from '@/db/user-db';
import { ApiResponse, User } from '@/types/user';

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
      error: 'Failed to fetch users',
    };
  }
};
