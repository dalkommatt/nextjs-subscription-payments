'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { updateName } from '@/utils/actions/update-name';
import { useOptimistic, useState } from 'react';

export default function NameForm({
  userID,
  userName
}: {
  userID: string;
  userName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [optimisticUserName, setOptimisticUserName] = useOptimistic(
    userName,
    (_, newName: string) => {
      return newName;
    }
  );

  return (
    <Card
      title="Your Name"
      description="Please enter your full name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">64 characters maximum</p>
          <Button
            variant="slim"
            type="submit"
            form="nameForm"
            loading={loading}
          >
            Update Name
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form
          id="nameForm"
          action={async (formData: FormData) => {
            setLoading(true);
            const fullName = String(formData.get('fullName')).trim();
            setOptimisticUserName(fullName);
            await updateName(fullName, userID);
            setLoading(false);
          }}
        >
          <input
            type="text"
            name="fullName"
            className="w-1/2 p-3 rounded-md bg-zinc-800"
            defaultValue={optimisticUserName}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
      </div>
    </Card>
  );
}
