import TaskManager from "@/components/TaskManager";
import AuthButton from "@/components/AuthButton";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center`}
    >
      {/* <div className="w-full flex justify-end p-4">
        <AuthButton />
      </div> */}
      <div className="pt-20">
        <TaskManager />
      </div>
    </main>
  );
}
