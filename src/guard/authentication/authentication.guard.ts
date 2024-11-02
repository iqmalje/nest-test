import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check supabase auth
    const session = await supabase.auth.getSession();
    if (!session.data.session) return false;

    if (session.error) return false;

    return true;
  }
}
