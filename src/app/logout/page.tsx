"use client";
import { useCookies } from 'next-client-cookies';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from "../Components/Spinner/spinner";

export default function Page() {
  const cookieStore = useCookies();
  const router = useRouter();

  useEffect(() => {
    const user = cookieStore.get('user');
    if (!user) {
        router.push("/");
    }
    else {
        cookieStore.remove('user');
        router.push("/");
    }
  }, [cookieStore, router]);

  return (
    <div>
        <Spinner />
    </div>
  );
};