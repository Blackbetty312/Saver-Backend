import { createParamDecorator } from '@nestjs/common';

export const UserFromPayload = createParamDecorator((data, req) => {
  return req.user;
});
