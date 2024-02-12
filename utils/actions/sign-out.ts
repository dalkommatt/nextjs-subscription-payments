'use server';

import { createClient } from '@/utils/supabase/server';
import { sendErrorToast } from '../helpers';

export async function signOut(formData: FormData) {
  const pathName = String(formData.get('pathName')).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return sendErrorToast(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    );
  }

  return '/signin';
}
