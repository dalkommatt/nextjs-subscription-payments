import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function SignIn() {
  const preferredSignInView =
    cookies().get('preferredSignInView')?.value || null;

  return redirect(`/signin/${preferredSignInView}`);
}
