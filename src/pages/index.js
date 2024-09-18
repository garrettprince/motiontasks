import TaskManager from "@/components/TaskManager";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "framer-motion";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isAuthenticated, user } = useKindeAuth();

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center`}
    >
      <Nav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="pt-10 flex flex-col items-center">
        {!isAuthenticated ? (
          <>
            <h1 className="text-2xl font-bold mt-2 mb-8">Motion Tasks</h1>
            <LoginLink className="">
              <Button
                variant="outline"
                className="h-8 border-gray-300 w-32 mb-10"
              >
                Sign In
              </Button>
            </LoginLink>
            {/* <RegisterLink>
              <Button variant="outline" className="h-6 w-32">
                Sign Up
              </Button>
            </RegisterLink> */}
            <p className="text-sm text-gray-500 w-48 text-center mb-4">
              Created by Garrett Prince
            </p>
            <p className="text-sm text-gray-500 w-48 text-center">
              Technologies Used: Next.js, Tailwind CSS, Kinde Auth, Supabase,
              Framer Motion, shadcn, Formik, and Vercel
            </p>
          </>
        ) : (
          <>
            {/* <p>Welcome, {user.given_name}!</p>
            <LogoutLink>Logout</LogoutLink> */}
            <TaskManager
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </>
        )}
      </div>
    </main>
  );
}
