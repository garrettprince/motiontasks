import TaskManager from "@/components/TaskManager";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { useState } from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";

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
      <div className="pt-10">
        {!isAuthenticated ? (
          <>
            <LoginLink className="mr-4">Sign in</LoginLink>
            <RegisterLink>Sign up</RegisterLink>
          </>
        ) : (
          <>
            <p>Welcome, {user.given_name}!</p>
            <LogoutLink>Logout</LogoutLink>
          </>
        )}
        <TaskManager
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </main>
  );
}
