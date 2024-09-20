import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import TaskManager from "@/components/TaskManager";
import Nav from "@/components/Nav";

export default function Main() {
  const { isAuthenticated, user } = useKindeAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Nav selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <TaskManager selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </main>
  );
}
