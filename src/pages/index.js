import Image from "next/image";
import { Inter } from "next/font/google";
import NewTaskModal from "@/components/NewTaskModal";
import Task from "@/components/Task";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <NewTaskModal />
      <Task />
    </main>
  );
}
