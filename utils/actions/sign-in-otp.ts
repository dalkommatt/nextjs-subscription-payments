'use server';

import { cookies } from 'next/headers';
import {
  getURL,
  isValidEmail,
  sendErrorToast,
  sendStatusToast
} from '../helpers';
import { createClient } from '../supabase/server';

export async function signInOtp(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = sendErrorToast(
      '/signin/email_signin',
      'Invalid email address.',
      'Please try again.'
    );
  }

  const supabase = createClient();
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true
  };

  // If allowPassword is false, do not create a new user
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options
  });

  if (error) {
    redirectPath = sendErrorToast(
      '/signin/email_signin',
      'You could not be signed in.',
      error.message
    );
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/' });
    redirectPath = sendStatusToast(
      '/signin/email_signin',
      'Success!',
      'Please check your email for a magic link. You may now close this tab.'
    );
  } else {
    redirectPath = sendErrorToast(
      '/signin/email_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    );
  }

  return redirectPath;
}
