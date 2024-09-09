import Task from "@/components/Task";
import Task3 from "@/components/Task3";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} flex min-h-screen flex-col items-center`}>
      <div className="">
        <Task />
      </div>
      <div className="pt-20">
        <Task3 />
      </div>
    </main>
  );
}
