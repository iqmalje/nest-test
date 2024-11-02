import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check supabase auth
    const user = await supabase.auth.getUser();

    if (!user.data.user) return false;

    if (user.error) return false;

    if (user.data.user.role !== 'admin') {
      return false;
    }

    return true;
  }
}
