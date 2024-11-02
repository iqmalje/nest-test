import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const errorMessage = 'Incorrect email or password';
    if (error) throw errorMessage;

    if (data.user.role !== 'admin') {
      console.log(
        `this ${data.user.email} tried to access, not being an admin, fucking dumbass`,
      );
      await supabase.auth.signOut();
      throw errorMessage;
    }
  }
}
