export interface JwtPayload {
  id: string;
}

export enum ValidRoles {
  admin = 'admin',
  su = 'super-user',
  user = 'user',
}

export const META_ROLES = 'roles';
