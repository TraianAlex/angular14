export interface UserModel {
  id: string;
  name?: string | null | undefined;
  password?: string | null | undefined;
  email?: string | null | undefined;
  role: string;
  isActive: boolean;
}

export type Roles = {
  id: number;
  name: string;
};
