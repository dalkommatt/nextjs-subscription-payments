'use server';

import { createClient } from '@/utils/supabase/server';
import { sendErrorToast, sendStatusToast } from '../helpers';

export async function updateName(fullName: string, userID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .update({ full_name: fullName })
    .eq('id', userID)
    .select()
    .single();

  if (error) {
    return sendErrorToast(
      '/account',
      'Your name could not be updated.',
      error.message
    );
  } else if (data.full_name === fullName) {
    return sendStatusToast(
      '/account',
      'Success!',
      'Your name has been updated.'
    );
  } else {
    return sendErrorToast(
      '/account',
      'Hmm... Something went wrong.',
      'Your name could not be updated.'
    );
  }
}
