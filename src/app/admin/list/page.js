'use client';
import { supabase } from '@/utils/supabase';
import Properties from './components';
import { useRouter } from 'next/navigation';

export default function List() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <div className="fixed top-5 right-5">
        <button
          className="px-5 py-2 bg-darkButNotBlack revamp-font-titi text-offwhite"
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          Log Out
        </button>
      </div>

      <div>
        <Properties />
      </div>
      <div className="fixed bottom-5 right-5">
        <button
          className="px-5 py-2 bg-blue-500 revamp-font-titi text-offwhite"
          onClick={() => {
            router.push('/admin/list/add');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
