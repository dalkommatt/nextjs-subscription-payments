'use server';

import { createClient } from '@/utils/supabase/server';
import {
  getURL,
  isValidEmail,
  sendErrorToast,
  sendStatusToast
} from '../helpers';

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return sendErrorToast(
      '/account',
      'Your email could not be updated.',
      'Invalid email address.'
    );
  }

  const supabase = createClient();

  const callbackUrl = getURL(
    sendStatusToast('/account', 'Success!', `Your email has been updated.`)
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl
    }
  );

  if (error) {
    return sendErrorToast(
      '/account',
      'Your email could not be updated.',
      error.message
    );
  } else {
    return sendStatusToast(
      '/account',
      'Confirmation emails sent.',
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    );
  }
}
