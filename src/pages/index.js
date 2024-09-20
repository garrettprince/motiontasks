/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoginLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated } = useKindeAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/main");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      
      <img src="/images/colorgroup.png" alt="Motion Tasks" className="w-24 mb-8" />
      <h1 className="text-2xl font-bold mt-2 mb-8">Motion Tasks</h1>
      <LoginLink>
        <Button variant="outline" className="h-8 border-gray-300 w-32 mb-10">
          Sign In
        </Button>
      </LoginLink>
      <p className="text-sm text-gray-500 w-48 text-center mb-4">
        Created by Garrett Prince
      </p>
      <p className="text-sm text-gray-500 w-48 text-center">
        Technologies Used: Next.js, Tailwind CSS, Kinde Auth, Supabase,
        Framer Motion, shadcn, Formik, and Vercel
      </p>
    </main>
  );
}
