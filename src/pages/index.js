import Image from "next/image";
import { Inter } from "next/font/google";
import NewTaskModal from "@/components/NewTaskModal";
import Task from "@/components/Task";
import StatusSelectButton from "@/components/StatusSelectButton";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <NewTaskModal />
      <Task />
    </main>
  );
}
