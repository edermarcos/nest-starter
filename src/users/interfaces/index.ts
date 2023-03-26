export interface JwtPayload {
  id: string;
}

export interface ILogin {
  token: string;
}

export enum ERoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PRODUCT_ADMIN = 'PRODUCT_ADMIN',
  PRODUCT_C = 'PRODUCT_C',
  PRODUCT_R = 'PRODUCT_R',
  PRODUCT_U = 'PRODUCT_U',
  PRODUCT_D = 'PROD_D',
}

export const META_ROLES = 'roles';
