import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';

@Injectable()
export class AuthService {
  async login(email: string, password: string): Promise<string> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const errorMessage = 'Incorrect email or password';
    if (error) throw errorMessage;

    if (data.user.role !== 'admin' && data.user.role !== 'maintainer') {
      console.log(
        `this ${data.user.email} tried to access, not being an admin or a maintainer, fucking dumbass`,
      );
      await supabase.auth.signOut();
      throw errorMessage;
    }

    return data.session.access_token;
  }

  async logout() {
    await supabase.auth.signOut();
  }
}
