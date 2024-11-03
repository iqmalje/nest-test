import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { supabase } from 'src/db/supabase-connection';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get  cookies
    const idk = context.switchToHttp();
    const request = idk.getRequest() as Request;

    const token = request.cookies['token'];
    if (!token) return false;

    // check supabase auth
    const user = await supabase.auth.getUser(token);

    if (!user.data.user) return false;

    if (user.error) return false;

    if (
      user.data.user.role !== 'admin' &&
      user.data.user.role !== 'maintainer'
    ) {
      return false;
    }

    return true;
  }
}
