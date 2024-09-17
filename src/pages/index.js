import TaskManager from "@/components/TaskManager";
import AuthButton from "@/components/AuthButton";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center`}
    >
      <Nav />
      <div className="pt-10">
        <TaskManager />
      </div>
    </main>
  );
}
