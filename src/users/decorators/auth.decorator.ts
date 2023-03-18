import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidRoles, META_ROLES } from '../interfaces';
import { RolesGuard } from '../guards/role.guard';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    SetMetadata(META_ROLES, roles),
    UseGuards(AuthGuard(), RolesGuard),
  );
};
